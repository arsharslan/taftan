import { IAddress } from "@/models/address";
import { fetchAddresses, patchCheckout } from "@/provider/api_provider";
import { useEffect, useState } from "react";
import { useOnlineOrderContext } from "../online_order_context";
import { CookiesProvider } from "@/provider/cookies_provider";
import { useParams } from "next/navigation";
import LoadingIndicator from "@/components/loading_indicator";
import { ArrowLongRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { HomeIcon, BuildingOfficeIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

const SelectAddressMobile = () => {
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [addressBeingSelected, setAddressBeingSelected] = useState<string>();
    const [selectedAddressId, setSelectedAddressId] = useState<string>();
    const params = useParams<{ id: string }>();
    const checkoutId: string | null = params?.id ?? null;
    const { checkout, setCheckout, setCurrentStep } = useOnlineOrderContext();

    const getAddresses = async () => {
        const response = await fetchAddresses({ user_id: (await CookiesProvider.getUserId()) ?? "" });
        if (response.data) {
            setAddresses(response.data);
            // Set selected address if checkout has one
            if (checkout?.address) {
                setSelectedAddressId((checkout.address as IAddress)._id ?? undefined);
            }
        }
    };

    useEffect(() => {
        getAddresses();
    }, []);

    const selectAddress = async (address: IAddress) => {
        setAddressBeingSelected(address._id ?? undefined);
        const response = await patchCheckout({
            checkout: {
                _id: checkout!._id,
                address: address
            }
        });
        if (response.data) {
            setCheckout(response.data);
            setSelectedAddressId(address._id ?? undefined);
            setCurrentStep(3);
        }
        setAddressBeingSelected(undefined);
    };

    const handleContinue = () => {
        if (selectedAddressId) {
            const selectedAddress = addresses.find(addr => addr._id === selectedAddressId);
            if (selectedAddress) {
                selectAddress(selectedAddress);
            }
        }
    };

    const getAddressIcon = (type: string) => {
        return type?.toLowerCase() === 'home' ? (
            <HomeIcon className="w-5 h-5 text-golden" />
        ) : (
            <BuildingOfficeIcon className="w-5 h-5 text-golden" />
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0A0101] via-[#1F0B0B] via-[#2A180A] to-[#4C2C15] text-white">
            {/* Add Address Section */}
            <div className="flex items-center justify-center mt-6">
                <Image src="/images/start-design.png" alt="" height={64} width={64} className="" />
                <div className="text-xl font-bold text-center mx-4">
                    Add Address
                </div>
                <Image src="/images/end-design.png" alt="" height={64} width={64} className="" />
            </div>

            {/* Saved Addresses Section */}
            <div className="px-4 mt-8">
                <h2 className="text-xl font-semibold text-golden mb-4">Saved Addresses</h2>
                
                <div className="space-y-4">
                    {addresses.map((address, index) => (
                        <div key={address._id} className="border-b border-gray-700 pb-4">
                            <div className="flex items-start space-x-3">
                                {/* Radio Button */}
                                <div className="flex items-center mt-1">
                                    <input
                                        type="radio"
                                        name="address"
                                        id={`address-${address._id}`}
                                        checked={selectedAddressId === address._id}
                                        onChange={() => setSelectedAddressId(address._id ?? undefined)}
                                        className="w-4 h-4 text-golden bg-gray-700 border-gray-600 focus:ring-golden focus:ring-2"
                                    />
                                </div>

                                {/* Address Content */}
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        {getAddressIcon(address.type)}
                                        <span className="ml-2 text-golden font-medium capitalize">{address.type}</span>
                                    </div>
                                    
                                    <div className="text-sm text-gray-300 leading-relaxed">
                                        C/O {address.name}, {address.street_address}, {address.city}, {address.state}, {address.landmark}, {address.pin_code}
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex space-x-4 mt-3">
                                        <button className="text-red-400 text-sm hover:text-red-300">
                                            Delete
                                        </button>
                                        <button className="text-golden text-sm hover:text-yellow-400">
                                            Edit
                                        </button>
                                    </div>
                                </div>

                                {/* Loading Indicator */}
                                {addressBeingSelected === address._id && (
                                    <div className="ml-2">
                                        <LoadingIndicator />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Continue Button */}
            <div className="fixed bottom-4 left-4 right-4">
                <button
                    onClick={handleContinue}
                    disabled={!selectedAddressId || addressBeingSelected}
                    className="w-full bg-golden-background text-white py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
            </div>

        </div>
    );
};

export default SelectAddressMobile; 