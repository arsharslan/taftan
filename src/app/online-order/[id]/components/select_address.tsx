import firebase_app from "@/firebase/config";
import { IAddress } from "@/models/address"
import { fetchAddresses, patchCheckout, postAddress } from "@/provider/api_provider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import FieldErrorDisplay from "@/components/field_error";
import LoadingIndicator from "@/components/loading_indicator";
import React from "react";
import { useParams } from "next/navigation";
import { useOnlineOrderContext } from "../online_order_context";
import { CookiesProvider } from "@/provider/cookies_provider";
import { CustomButton, SleekButton } from "@/components/custom_button";
import Autocomplete from "@/components/autocomplete";

type AddressForm = {
    name: string;
    street_address: string;
    city: string;
    state: string;
    landmark?: string;
    pin_code: number;
    phone_number: string;
}

const schema = z.object({
    name: z.string().min(3),
    street_address: z.string().min(3),
    city: z.string().min(3),
    state: z.string().min(3),
    landmark: z.string().nullish(),
    pin_code: z.number().min(6),
    phone_number: z.string().min(10)
})

export default function SelectAddressView() {

    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [addressBeingSelected, setAddressBeingSelected] = useState<string>();
    const params = useParams<{ id: string }>()
    const checkoutId: string | null = params?.id ?? null;
    const { checkout, setCheckout, setCurrentStep } = useOnlineOrderContext();

    const getAddresses = async () => {
        const response = await fetchAddresses({ user_id: (await CookiesProvider.getUserId()) ?? "" });
        if (response.data) {
            setAddresses(response.data);
        }
    }

    useEffect(() => {
        getAddresses();
    }, []);

    useEffect(() => {
        reset((prev) => {
            return { ...prev, pin_code: 0 };
        })
    }, [open]);

    const { register, reset, handleSubmit, formState: { errors }, setValue } = useForm<AddressForm>({ resolver: zodResolver(schema) });
    const [isAddingAddress, setIsAddingAddress] = useState<boolean>(false);

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
                phone_number: data.phone_number
            }
        });
        if (response.data) {
            toast("Address added successfully!");
            getAddresses();
            setOpen(false);
        }
        setIsAddingAddress(false);
    }

    const selectAddress = async (address: IAddress) => {
        setAddressBeingSelected(address._id ?? undefined);
        const response = await patchCheckout({
            checkout: {
                _id: checkout!._id,
                address
            }
        });
        if (response.data) {
            console.log("successfull")
            setCheckout(response.data);
            setCurrentStep(3);
        }
        setAddressBeingSelected(undefined);
    }

    return <>
        <ToastContainer
            toastStyle={{ backgroundColor: "black", color: "white" }} />
        <div className="m-16 flex">
            <h2 className="mr-auto text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
                Select Address
            </h2>

            <CustomButton text="Add Address" onClick={() => {
                setOpen(true);
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

        {addresses.map((address, index) => <div
            key={index}
            className="w-1/2 overflow-hidden rounded-lg bg-gray-800 shadow-md mx-8 mb-8 mx-auto">
            <div className="px-4 py-5 sm:p-6">
                <table className="min-w-full divide-y divide-gray-300 table-auto" >
                    {/* <thead>
                        <tr className="divide-x divide-[#DAA520]">
                            <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                #
                            </th>
                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">

                            </th>

                        </tr>
                    </thead> */}
                    <tbody className="divide-y divide-[#DAA520] text-white">
                        <tr className="divide-x divide-[#DAA520]">
                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium sm:pl-0 w-0">
                                Name
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm">
                                {address.name}
                            </td>
                        </tr>
                        <tr className="divide-x divide-[#DAA520]">
                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium sm:pl-0">
                                Street Address
                            </td>
                            <td className="p-4 text-sm">{address.street_address}</td>
                        </tr>
                        <tr className="divide-x divide-[#DAA520]">
                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium sm:pl-0">
                                City
                            </td>
                            <td className="whitespace-nowrap p-4 text-sm">{address.city}</td>

                        </tr>
                        <tr className="divide-x divide-[#DAA520]">
                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium sm:pl-0">
                                State
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm sm:pr-0">{address.state}</td>

                        </tr>
                        {address.landmark && <tr className="divide-x divide-[#DAA520]">
                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium sm:pl-0">
                                Landmark
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm sm:pr-0">{address.landmark}</td>

                        </tr>}
                        <tr className="divide-x divide-[#DAA520]">
                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium sm:pl-0">
                                Pin Code
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm sm:pr-0">{address.pin_code}</td>
                        </tr>
                        <tr className="divide-x divide-[#DAA520]">
                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium sm:pl-0">
                                Phone Number
                            </td>
                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm sm:pr-0">{address.phone_number}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="flex">
                <div className="ml-auto mx-8 mb-8">

                    {addressBeingSelected === address._id ? <LoadingIndicator /> : <SleekButton
                        onClick={() => {
                            selectAddress(address);
                        }}
                        text={checkout?.address?._id === address._id ? "Selected" : "Select"}
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

        <div className="h-8" />

        <Dialog open={open} onClose={setOpen} className="relative z-10 text-gray-200">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-700/50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <form className="mt-2" onSubmit={handleSubmit(submit)}>

                            <div>
                                <div className="text-center space-y-2">
                                    <DialogTitle as="h3" className="text-base font-semibold">
                                        Add Address
                                    </DialogTitle>
                                    <div>
                                        <label htmlFor="email" className="text-left block text-sm/6 font-medium ">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("name", { required: true })}
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="block w-full bg-transparent rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            />
                                            {errors.name?.message && <FieldErrorDisplay error={errors.name?.message} className="flex" />}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-left block text-sm/6 font-medium">
                                            Pin Code
                                        </label>
                                        <div className="mt-2">
                                            <Autocomplete
                                                id="pin_code"
                                                name="pin_code"
                                                className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                registerValue={register("pin_code", {
                                                    required: true, valueAsNumber: true
                                                })}
                                                onSelect={(place) => {
                                                    const state = place?.address_components?.filter(
                                                        (x) =>
                                                            x.types.includes(
                                                                "administrative_area_level_1"
                                                            )
                                                    )[0]?.long_name;
                                                    const pin = place?.address_components?.filter(
                                                        (x) => x.types.includes("postal_code")
                                                    )[0]?.long_name;
                                                    const city = place?.address_components?.filter(
                                                        (x) => x.types.includes("locality")
                                                    )[0]?.long_name;
                                                    const street = place?.address_components?.filter(
                                                        (x) => x.types.includes("sublocality_level_1")
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
                                                    setValue("street_address", (street ?? ""), {
                                                        shouldValidate: true,
                                                    });
                                                }}
                                            />
                                            {errors.pin_code?.message && <FieldErrorDisplay error={errors.pin_code?.message} className="flex" />}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-left block text-sm/6 font-medium">
                                            Street Address
                                        </label>
                                        <div className="mt-2">
                                            {/* <Autocomplete
                                                id="street_address"
                                                name="street_address"
                                                className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                                registerValue={register("street_address", {
                                                    required: true
                                                })}
                                                onSelect={(place) => {
                                                    const state = place?.address_components?.filter(
                                                        (x) =>
                                                            x.types.includes(
                                                                "administrative_area_level_1"
                                                            )
                                                    )[0]?.long_name;
                                                    const pin = place?.address_components?.filter(
                                                        (x) => x.types.includes("postal_code")
                                                    )[0]?.long_name;
                                                    const city = place?.address_components?.filter(
                                                        (x) => x.types.includes("locality")
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
                                                }}
                                            /> */}
                                            <input
                                                {...register("street_address", { required: true })}
                                                id="street_address"
                                                name="street_address"
                                                type="text"
                                                className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            />
                                            {errors.street_address?.message && <FieldErrorDisplay error={errors.street_address?.message} className="flex" />}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="text-left block text-sm/6 font-medium">
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("city", { required: true })}
                                                id="city"
                                                name="city"
                                                type="text"
                                                className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            />
                                            {errors.city?.message && <FieldErrorDisplay error={errors.city?.message} className="flex" />}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-left block text-sm/6 font-medium">
                                            State
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("state", { required: true })}
                                                id="state"
                                                name="state"
                                                type="text"
                                                className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            />
                                            {errors.state?.message && <FieldErrorDisplay error={errors.state?.message} className="flex" />}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-left block text-sm/6 font-medium">
                                            Landmark
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("landmark")}
                                                id="landmark"
                                                name="landmark"
                                                type="text"
                                                className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            />
                                            {errors.landmark?.message && <FieldErrorDisplay error={errors.landmark?.message} className="flex" />}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-left block text-sm/6 font-medium">
                                            Phone Number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("phone_number", { required: true })}
                                                id="phone_number"
                                                name="phone_number"
                                                type="text"
                                                className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                            />
                                            {errors.phone_number?.message && <FieldErrorDisplay error={errors.phone_number?.message} className="flex" />}
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
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    </>
}