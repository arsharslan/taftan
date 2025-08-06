"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { MapPinIcon, Bars3Icon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { postAddress } from "@/provider/api_provider";
import { IAddress } from "@/models/address";
import { CookiesProvider } from "@/provider/cookies_provider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingIndicator from "@/components/loading_indicator";
import FieldErrorDisplay from "@/components/field_error";
import { getAddressFromLatLong, getCoordinatesFromAddress } from "@/provider/api_provider";
import { debounce } from "@/utils/debounce";

// Zod schema for form validation
const addressSchema = z.object({
  type: z.string().min(1, "Please select an address type"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  street_address: z.string().min(3, "Address must be at least 3 characters"),
  address_line_2: z.string().optional(),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  pin_code: z.string().min(6, "Pin code must be at least 6 characters"),
  phone_number: z.string().min(10, "Phone number must be at least 10 characters"),
  place_id: z.string().min(1, "Location is required"),
});

type AddressFormData = z.infer<typeof addressSchema>;

export default function AddAddressPage() {
  const [coordinates, setCoordinates] = useState<[number, number]>([0, 0]);
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      type: "Home",
      phone_number: "+91",
    },
  });

  const selectedType = watch("type");

  useEffect(() => {
    // Initialize map first
    setTimeout(() => {
      setShowMap(true);
    }, 1000);

    // Check if geolocation is supported
    if (navigator.geolocation) {
      // Try to check permissions if the API is available
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' as any }).then((permissionStatus) => {
          if (permissionStatus.state === 'granted') {
            // Permission already granted, get location
            getCurrentLocation();
          } else if (permissionStatus.state === 'prompt') {
            // Permission not determined yet, will be prompted when getCurrentLocation is called
            // Don't auto-trigger, let user click the button
            console.log('Location permission will be requested when user clicks Get Location');
          } else {
            // Permission denied
            console.log('Location permission denied');
          }
        }).catch((error) => {
          // Permissions API not supported or failed, don't auto-trigger
          console.log('Permissions API not supported, will request location when user clicks button');
        });
      } else {
        // Permissions API not supported, don't auto-trigger location request
        console.log('Permissions API not supported, will request location when user clicks button');
      }
    }
  }, []);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 15000, // Increased timeout for mobile
        maximumAge: 60000
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCoordinates([latitude, longitude]);
          getAddressFromCoordinates(latitude, longitude);
          setIsGettingLocation(false);
          toast.success("Location obtained successfully!");
        },
        (error) => {
          setIsGettingLocation(false);
          let errorMessage = "Unable to get current location";
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location permission denied. Please enable location access in your browser settings and try again.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable. Please check your GPS settings.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out. Please check your internet connection and try again.";
              break;
            default:
              errorMessage = "An unknown error occurred while getting location. Please try again.";
              break;
          }
          
          toast.error(errorMessage);
          console.error("Geolocation error:", error);
        },
        options
      );
    } else {
      setIsGettingLocation(false);
      toast.error("Geolocation is not supported by this browser");
    }
  };

  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await getAddressFromLatLong({
        latitude: lat,
        longitude: lng,
      });

      if (response.data?.results?.[0]) {
        const result = response.data.results[0];
        const addressComponents = result.address_components || [];

        const streetNumber = addressComponents.find(x => x.types?.includes("street_number"))?.long_name || "";
        const route = addressComponents.find(x => x.types?.includes("route"))?.long_name || "";
        const neighborhood = addressComponents.find(x => x.types?.includes("neighborhood"))?.long_name || "";
        const sublocality = addressComponents.find(x => x.types?.includes("sublocality_level_1"))?.long_name || "";
        const city = addressComponents.find(x => x.types?.includes("locality"))?.long_name || 
                     addressComponents.find(x => x.types?.includes("administrative_area_level_3"))?.long_name || "";
        const state = addressComponents.find(x => x.types?.includes("administrative_area_level_1"))?.long_name || "";
        const pinCode = addressComponents.find(x => x.types?.includes("postal_code"))?.long_name || "";

        setValue("street_address", result.formatted_address || [streetNumber, route, neighborhood, sublocality].filter(Boolean).join(", "));
        setValue("city", city);
        setValue("state", state);
        setValue("pin_code", pinCode);
        setValue("place_id", result.place_id || "");
      }
    } catch (error) {
      console.error("Error getting address from coordinates:", error);
    }
  };

  const onSubmit = async (data: AddressFormData) => {
    setIsLoading(true);
    try {
      const userId = await CookiesProvider.getUserId();
      if (!userId) {
        toast.error("User not authenticated");
        router.push("/sign-in");
        return;
      }

      const addressData: IAddress = {
        user_id: userId,
        name: data.name,
        street_address: data.street_address,
        city: data.city,
        state: data.state,
        landmark: data.address_line_2,
        pin_code: parseInt(data.pin_code),
        phone_number: data.phone_number,
        place_id: data.place_id,
        type: data.type,
      };

      const response = await postAddress({ address: addressData });

      if (response.status && response.data) {
        toast.success("Address saved successfully!");
        if (searchParams?.get("navigate_back") === "true") {
            router.back();
        } else {
            router.push("/online-order");
        }
      } else {
        toast.error(response.formatted_error || "Failed to save address");
      }
    } catch (error) {
      toast.error("An error occurred while saving the address");
    } finally {
      setIsLoading(false);
    }
  };

  const searchParams = useSearchParams();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0101] via-[#1F0B0B] via-[#2A180A] to-[#4C2C15]">
      {/* Header */}


      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Title */}
        <div className="flex items-center justify-center mb-6">
        <Image src="/images/start-design.png" alt="" height={64} width={64} className="" />
        <h1 className="text-2xl font-bold text-golden mx-4">Add Address</h1>
        <Image src="/images/end-design.png" alt="" height={64} width={64} className="" />
        </div>

        {/* Map Section */}
        <div className="mb-6">
          {showMap && (
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Map
                  center={{ lat: coordinates[0], lng: coordinates[1] }}
                  defaultZoom={15}
                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                  onCenterChanged={async (event) => {
                    const lat = event.detail.center.lat;
                    const lng = event.detail.center.lng;
                    setCoordinates([lat, lng]);
                    debounce(async () => {
                      getAddressFromCoordinates(lat, lng);
                    }, 1000);
                  }}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <MapPinIcon className="h-8 w-8 text-red-600 mb-6" />
                </div>
              </div>
            </APIProvider>
          )}

          {/* Get Location Button */}
          <div className="mt-4 -translate-y-10">
            <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className=" bg-golden text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-golden/90 transition-colors disabled:opacity-50"
            >
              {isGettingLocation ? (
                <LoadingIndicator />
              ) : (
                <>
                  <Image src={"/images/gps.png"} height={20} width={20} alt="GPS"/>
                  Get Location
                </>
              )}
            </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              {isGettingLocation 
                ? "Getting your location..." 
                : "Tap to allow location access and automatically fill your address"
              }
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 -translate-y-10">
          {/* Address Type Selection */}
          <div>
            <label className="block text-sm font-medium text-golden mb-3">
              Save Address As
            </label>
            <div className="flex gap-2">
              {["Home", "Work", "Hostel", "Other"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setValue("type", type)}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    selectedType === type
                      ? "border border-foreground-color text-foreground-color"
                      : " text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.type && <FieldErrorDisplay error={errors.type.message!} />}
          </div>

          {/* Address Line 1 */}
          <div>
            <label className="block text-sm font-medium text-golden mb-2">
              Address line 1
            </label>
            <input
              {...register("street_address")}
              type="text"
              className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-golden focus:ring-1 focus:ring-golden"
              placeholder="Enter your address"
            />
            {errors.street_address && <FieldErrorDisplay error={errors.street_address.message!} />}
          </div>

          {/* Address Line 2 */}
          <div>
            <label className="block text-sm font-medium text-golden mb-2">
              Address line 2
            </label>
            <input
              {...register("address_line_2")}
              type="text"
              className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-golden focus:ring-1 focus:ring-golden"
              placeholder="Apartment, suite, etc. (optional)"
            />
          </div>

          {/* State and City */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-golden mb-2">
                State
              </label>
              <select
                {...register("state")}
                className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-golden focus:ring-1 focus:ring-golden"
              >
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Gujarat">Gujarat</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
              </select>
              {errors.state && <FieldErrorDisplay error={errors.state.message!} />}
            </div>
            <div>
              <label className="block text-sm font-medium text-golden mb-2">
                City
              </label>
              <select
                {...register("city")}
                className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-golden focus:ring-1 focus:ring-golden"
              >
                <option value="">Select City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Lucknow">Lucknow</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Vijayawada">Vijayawada</option>
              </select>
              {errors.city && <FieldErrorDisplay error={errors.city.message!} />}
            </div>
          </div>

          {/* Pin Code */}
          <div>
            <label className="block text-sm font-medium text-golden mb-2">
              Zipcode
            </label>
            <input
              {...register("pin_code")}
              type="text"
              className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-golden focus:ring-1 focus:ring-golden"
              placeholder="Enter zipcode"
            />
            {errors.pin_code && <FieldErrorDisplay error={errors.pin_code.message!} />}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-golden mb-2">
              Mobile number
            </label>
            <input
              {...register("phone_number")}
              type="tel"
              className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-golden focus:ring-1 focus:ring-golden"
              placeholder="+91"
            />
            {errors.phone_number && <FieldErrorDisplay error={errors.phone_number.message!} />}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-golden mb-2">
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              className="w-full bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-golden focus:ring-1 focus:ring-golden"
              placeholder="Enter your name"
            />
            {errors.name && <FieldErrorDisplay error={errors.name.message!} />}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-golden text-white font-semibold py-3 px-4 rounded-lg hover:bg-golden/90 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {isLoading ? <LoadingIndicator /> : "Continue"}
          </button>
        </form>
      </div>
      <ToastContainer
        toastStyle={{ backgroundColor: "black", color: "white" }}
      />
      
    </div>
  );
} 