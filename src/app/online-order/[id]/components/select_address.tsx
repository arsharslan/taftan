import firebase_app from "@/firebase/config";
import { IAddress } from "@/models/address"
import { fetchAddresses, getAddressFromLatLong, getCoordinatesFromAddress, patchCheckout, postAddress } from "@/provider/api_provider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import FieldErrorDisplay from "@/components/field_error";
import LoadingIndicator from "@/components/loading_indicator";
import React from "react";
import { useParams } from "next/navigation";
import { AddressForm, useOnlineOrderContext } from "../online_order_context";
import { CookiesProvider } from "@/provider/cookies_provider";
import { CustomButton, SleekButton } from "@/components/custom_button";
import { ArrowLongRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import Autocomplete from "@/components/autocomplete";
import Script from "next/script";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { debounce } from "@/utils/debounce";
import { generateUniqSerial } from "@/utils/unique";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { useMediaQuery } from 'react-responsive';
import PickLocation from "./pick_location";
import FillAddressForm from "./fill_address_form";
import SelectAddressMobile from "./select_address_mobile";

function SelectAddressDesktopView() {
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [addressBeingSelected, setAddressBeingSelected] = useState<string>();
    const params = useParams<{ id: string }>()
    const checkoutId: string | null = params?.id ?? null;
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
        setSmallScreenPickAddress,
        isAddingAddress,
        setIsAddingAddress,
        smallScreenFillAddressForm,
        smallScreenPickAddress,
        setSmallScreenFillAddressForm
    } = useOnlineOrderContext();

    const getAddresses = async () => {
        const response = await fetchAddresses({ user_id: (await CookiesProvider.getUserId()) ?? "" });
        if (response.data) {
            setAddresses(response.data);
        }
    }

    const fetchLocation = () => {
        navigator.geolocation.getCurrentPosition(async ({ coords }) => {
            const { latitude, longitude } = coords;
            const response = await getAddressFromLatLong({ latitude, longitude });
            reset((prev) => {
                return {
                    ...prev,
                    latitude,
                    longitude
                };
            });
        }, (error) => {
            if (error.PERMISSION_DENIED) {
                setShowLocationError("Location is required to add address");
            }
        })
    }

    useEffect(() => {
        getAddresses();
    }, []);

    useEffect(() => {
        reset((prev) => {
            return { ...prev, pin_code: 0 };
        })
    }, [open]);


    const submit = async (data: AddressForm) => {
        setIsAddingAddress(true);
        const response = await postAddress({
            address: {
                user_id: (await CookiesProvider.getUserId()) ?? "",
                name: data.name,
                street_address: data.street_address,
                city: data.city,
                state: data.state,
                landmark: data.landmark,
                pin_code: data.pin_code,
                phone_number: data.phone_number,
                place_id: data.place_id,
                type: data.type
                /* latitude: data.latitude,
                longitude: data.longitude */
            }
        });
        if (response.data) {
            toast("Address added successfully!");
            getAddresses();
            setOpen(false);
            if (isSmallScreen) {
                setSmallScreenPickAddress(false);
                setSmallScreenFillAddressForm(false);
            }
        }
        setIsAddingAddress(false);
    }

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
            setCurrentStep(3);
        }
        setAddressBeingSelected(undefined);
    }

    const [showLocationError, setShowLocationError] = useState<string>();

    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

    return <>

        <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
            strategy="beforeInteractive"
        />

        <ToastContainer
            toastStyle={{ backgroundColor: "black", color: "white" }} />

        <form className="mt-2" onSubmit={handleSubmit(submit)}>
            {
                smallScreenFillAddressForm ? <div className="text-gray-200 mx-8">
                    <FillAddressForm />
                </div> :
                    smallScreenPickAddress ? <div className="h-80 mx-8">
                        <PickLocation />
                    </div> : <>
                        <div className="m-16 flex">
                            <h2 className="mr-auto text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
                                Select Address
                            </h2>

                            <CustomButton text="Add Address" onClick={() => {
                                if (isSmallScreen) {
                                    setSmallScreenPickAddress(true);
                                } else {
                                    setOpen(true);
                                }
                            }} />
                            {/* <button
                type="button"
                onClick={() => {
                    setOpen(true);
                }}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Add Address
            </button> */}
                        </div>

                        <div className="space-y-4">
                            {addresses.map((address, index) =>
                                isSmallScreen ? <div
                                    onClick={() => {
                                        selectAddress(address);
                                    }}
                                    className="mx-8 overflow-hidden rounded-lg bg-gray-700 shadow" key={address._id}>
                                    <div className="px-4 py-5 sm:p-6">
                                        <h3 className="text-base font-semibold text-gray-100">{address.type}</h3>
                                        <p className="mt-1 text-sm text-gray-200">
                                            {address.street_address}
                                        </p>
                                        <div className="flex items-center">
                                            <p className="mt-1 text-sm text-gray-200">
                                            </p>
                                            <p className="mt-1 text-sm text-gray-200">
                                                {`${address.state}, ${address.city}`}
                                            </p>
                                            <p className="ml-auto text-sm text-gray-200">
                                                {addressBeingSelected === address._id ? <LoadingIndicator /> : <ArrowLongRightIcon className="h-4 w-8 text-blue-200" />}
                                            </p>
                                        </div>
                                    </div>
                                </div> :
                                    <div
                                        key={generateUniqSerial()}
                                        className="w-1/2 overflow-hidden rounded-lg bg-gray-800 shadow-md mx-8 mb-8 mx-auto">
                                        <div className="px-4 py-5 sm:p-6">
                                            <dl className="mt-10 space-y-6 text-sm font-medium text-gray-300">
                                                <div className="flex justify-between">
                                                    <dt>Name</dt>
                                                    <dd className="">{address.name}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt>Street Address</dt>
                                                    <dd className="">{address.street_address}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt>City</dt>
                                                    <dd className="">{address.city}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt>State</dt>
                                                    <dd className="">{address.state}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt>Type</dt>
                                                    <dd className="">{address.type}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt>Landmark</dt>
                                                    <dd className="">{address.landmark}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt>Pincode</dt>
                                                    <dd className="">{address.pin_code}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt>Phone Number</dt>
                                                    <dd className="">{address.phone_number}</dd>
                                                </div>

                                            </dl>
                                        </div>
                                        <div className="flex">
                                            <div className="ml-auto mx-8 mb-8">

                                                {addressBeingSelected === address._id ? <LoadingIndicator /> : <SleekButton
                                                    onClick={() => {
                                                        selectAddress(address);
                                                    }}
                                                    text={(checkout?.address as IAddress)?._id === address._id ? "Selected" : "Select"}
                                                />}
                                            </div>
                                            {/* <button
                    type="button"
                    disabled={checkout?.address?._id === address._id}
                    onClick={() => {
                        selectAddress(address);
                    }}
                    className="disabled:opacity-35 mx-8 mb-8 ml-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {addressBeingSelected === address._id ? <LoadingIndicator /> : checkout?.address?._id === address._id ? "Selected" : "Select"}
                </button> */}
                                        </div>
                                    </div>)}
                        </div>


                        <div className="h-8" />

                        <Dialog open={open} onClose={() => {
                            setOpen(false);
                            setShowMap(false);
                        }} className="relative z-10 text-gray-200">
                            <DialogBackdrop
                                transition
                                className="fixed inset-0 bg-gray-700/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                            />

                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <DialogPanel
                                        transition
                                        className="relative transform overflow-hidden rounded-lg bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-4xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                                    >

                                        <div>
                                            <div className="text-center space-y-2">
                                                <DialogTitle as="h3" className="text-base font-semibold">
                                                    Add Address
                                                </DialogTitle>
                                                <div className="flex">
                                                    <div className="flex-1 flex flex-col">
                                                        <PickLocation />
                                                    </div>
                                                    <div className="w-4" />
                                                    <div className="flex-1">
                                                        <FillAddressForm />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                            <button
                                                type="submit"
                                                className="inline-flex w-full justify-center rounded-md bg-golden ring-golden ring-2 text-black hover:text-white px-3 py-2 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  sm:col-start-2"
                                            >
                                                {isAddingAddress ? <LoadingIndicator /> : "Save"}
                                            </button>
                                            <button
                                                type="button"
                                                data-autofocus
                                                onClick={() => setOpen(false)}
                                                className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold  shadow-sm bg-black ring-golden ring-2 text-white hover:text-golden sm:col-start-1 sm:mt-0"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </DialogPanel>
                                </div>
                            </div>
                        </Dialog >

                        <Dialog open={showLocationError !== undefined} onClose={() => {
                            setShowLocationError(undefined);
                        }} className="relative z-10">
                            <DialogBackdrop
                                transition
                                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                            />

                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <DialogPanel
                                        transition
                                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                                    >
                                        <div>
                                            <div className="text-center">
                                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                                    {showLocationError}
                                                </DialogTitle>
                                                {/* <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
                                    </p>
                                </div> */}
                                            </div>
                                        </div>
                                        <div className="mt-5 sm:mt-6">
                                            <SleekButton
                                                text="Go Back"
                                                onClick={() => {
                                                    setShowLocationError(undefined);
                                                }}
                                            />
                                        </div>
                                    </DialogPanel>
                                </div>
                            </div>
                        </Dialog>
                    </>}

        </form >
    </>
}

export function SelectAddressView() {
    return (
        <>
            {/* Mobile View */}
            <div className="block sm:hidden">
                <SelectAddressMobile />
            </div>
            {/* Desktop/Tablet View */}
            <div className="hidden sm:block">
                <SelectAddressDesktopView />
            </div>
        </>
    );
}

export default SelectAddressView;