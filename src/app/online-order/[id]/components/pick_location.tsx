import Autocomplete from "@/components/autocomplete";
import FieldErrorDisplay from "@/components/field_error";
import { getAddressFromLatLong, getCoordinatesFromAddress } from "@/provider/api_provider";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { useOnlineOrderContext } from "../online_order_context";
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { debounce } from "@/utils/debounce";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { SleekButton } from "@/components/custom_button";

export default function PickLocation() {
    const { checkout, setCheckout, setCurrentStep, showMap,
        setShowMap,
        coordinates,
        setCoordinates,
        register,
        reset,
        handleSubmit,
        errors,
        control,
        setValue,
        setSmallScreenFillAddressForm
    } = useOnlineOrderContext();

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setCoordinates([latitude, longitude]);
                getAddressFromCoordinates(latitude, longitude);
            }, () => { });
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setShowMap(true);
            getCurrentLocation();
        }, 1000);
    }, []);

    const getAddressFromCoordinates = async (lat: number, lng: number) => {
        const response = await getAddressFromLatLong({
            latitude: lat,
            longitude: lng
        });
        console.log(response.data);
        if (response.data) {


            const streetNumber = response.data.results?.at(0)?.address_components?.filter(
                (x) => x.types?.includes("street_number")
            )[0]?.long_name;
            const route = response.data.results?.at(0)?.address_components?.filter(
                (x) => x.types?.includes("route")
            )[0]?.long_name;
            const neighborhood = response.data.results?.at(0)?.address_components?.filter(
                (x) => x.types?.includes("neighborhood")
            )[0]?.long_name;
            const sublocality_level_1 = response.data.results?.at(0)?.address_components?.filter(
                (x) => x.types?.includes("sublocality_level_1")
            )[0]?.long_name;
            const city = response.data.results?.at(0)?.address_components?.filter(
                (x) => x.types?.includes("administrative_area_level_3")
            )[0]?.long_name;
            const state = response.data.results?.at(0)?.address_components?.filter(
                (x) => x.types?.includes("administrative_area_level_1")
            )[0]?.long_name;
            const pin = response.data.results?.at(0)?.address_components?.filter(
                (x) => x.types?.includes("postal_code")
            )[0]?.long_name;

            response.data.results?.at(0)?.formatted_address

            setValue("street_address",
                response.data.results?.at(0)?.formatted_address ?? [streetNumber, route, neighborhood, sublocality_level_1].filter((x) => x !== undefined).join(", "));
            setValue("city", city ?? "");
            setValue("state", state ?? "");
            setValue("pin_code", pin ? +(pin) : 0);

            setValue("place_id", response.data?.results?.at(0)?.place_id ?? "");

        }
    }
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

    return <>
        <div>
            <label htmlFor="email" className="text-left block text-sm/6 font-medium ">
                Street Address
            </label>
            <div className="mt-2">
                <Autocomplete
                    id="street_address"
                    name="street_address"
                    registerValue={register("street_address", {
                        required: true,
                    })}
                    onSelect={async (place) => {
                        console.log(place);
                        const streetAddress = place?.address_components?.filter(
                            (x) =>
                                x.types.includes(
                                    "sublocality_level_1"
                                )
                        )[0]?.long_name;
                        const city = place?.address_components?.filter(
                            (x) => x.types.includes("locality")
                        )[0]?.long_name;
                        const state = place?.address_components?.filter(
                            (x) =>
                                x.types.includes(
                                    "administrative_area_level_1"
                                )
                        )[0]?.long_name;
                        const pin = place?.address_components?.filter(
                            (x) => x.types.includes("postal_code")
                        )[0]?.long_name;

                        setValue("city", city ?? "", {
                            shouldValidate: true,
                        });
                        setValue("state", state ?? "", {
                            shouldValidate: true,
                        });
                        setValue("pin_code", +(pin ?? ""), {
                            shouldValidate: true,
                        });

                        const response = await getCoordinatesFromAddress({
                            address: `${streetAddress}, ${city}, ${state}`
                        });

                        setValue("place_id", response.data?.results?.at(0)?.place_id ?? "");

                        setCoordinates([
                            response.data?.results?.at(0)?.geometry?.location?.lat ?? 0,
                            response.data?.results?.at(0)?.geometry?.location?.lng ?? 0,
                        ]);
                    }}
                />
                {errors.street_address?.message && <FieldErrorDisplay error={errors.street_address?.message} className="flex" />}
            </div>
        </div>
        <div className="h-4" />
        {showMap && <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
            <div className="relative w-full h-full">

                <Map
                    style={{
                        borderRadius: '12px'
                    }}
                    center={{ lat: coordinates?.at(0) ?? 0, lng: coordinates?.at(1) ?? 0 }}
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

                        // console.log(response);
                    }}
                    className="w-full h-full"
                />

                <div className="absolute inset-0 my-auto mx-auto w-8 h-8 opacity-75 flex items-center">
                    <MapPinIcon className="h-8 w-8 mx-auto text-red-700 mb-6" />
                </div>
            </div>
        </APIProvider>}
        <div className="mt-2 mr-auto">
            <button
                type="button"
                onClick={getCurrentLocation}
                className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
                <div className="flex items-center">
                    <div className="h-4 w-4 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0c17.7 0 32 14.3 32 32l0 34.7C368.4 80.1 431.9 143.6 445.3 224l34.7 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-34.7 0C431.9 368.4 368.4 431.9 288 445.3l0 34.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.7C143.6 431.9 80.1 368.4 66.7 288L32 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l34.7 0C80.1 143.6 143.6 80.1 224 66.7L224 32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" /></svg>
                    </div>
                    <p>Go to current location</p>
                </div>
            </button>
        </div>

        {isSmallScreen && <div className="flex mt-8">
            <SleekButton
                onClick={() => {
                    setSmallScreenFillAddressForm(true);
                }}
                text="Add more address details"
            />
        </div>}
    </>
}