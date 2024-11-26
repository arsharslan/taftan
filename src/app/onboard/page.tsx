"use client";
import firebase_app from "@/firebase/config";
import { findUser, postUser } from "@/provider/api_provider";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldErrorDisplay from "@/components/field_error";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIndicator from "@/components/loading_indicator";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CookiesProvider } from "@/provider/cookies_provider";

type FormData = {
    photo: File,
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
}

const schema = z.object({
    photo: z.instanceof(File).nullish(),
    first_name: z.string().min(3),
    last_name: z.string().nullish(),
    email: z.string().email(),
    phone_number: z.string().min(10).max(10)
});

export default function OnboardView() {
    const [firebaseId, setFirebaseId] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
    const searchParams = useSearchParams();
    const router = useRouter();
    
    useEffect(() => {
        const auth = getAuth(firebase_app);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {

                // const response = await findUser({ firebase_id: user.uid });
                setFirebaseId(user.uid);
                reset((prev) => {
                    return { ...prev, email: user.email ?? "" };
                })
                unsubscribe();
            }
        });

    }, []);

    const submitForm = async (data: FormData) => {
        if (!firebaseId) { return; }
        setIsSubmitting(true);
        const response = await postUser({
            user: {
                firebase_id: firebaseId,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone_number: data.phone_number
            }
        });
        if (response.data) {
            CookiesProvider.setUserId(response.data._id);
            toast("Onboarding Completed");
            router.push(searchParams?.get("redirect") ?? "/");
        } else {
            toast(response.formatted_error);
        }
        setIsSubmitting(false);
    }

    return <form className="m-16" onSubmit={handleSubmit(submitForm)}>
        <div className="sm:mr-auto sm:w-full sm:max-w-sm mb-8">
            <Image src={"/images/taftan_new_logo.png"} alt={""} height={100} width={100} />
        </div>
        <div className="min-w-0 flex-1 mb-4">
            <h2 className="text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight">
                Help us serve you better
            </h2>
        </div>
        <div className="space-y-12">
            {/* <div className="border-b border-white/10 pb-12">
                <h2 className="text-base/7 font-semibold text-white">Profile</h2>
                <p className="mt-1 text-sm/6 text-gray-400">
                    This information will be displayed publicly so be careful what you share.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div className="col-span-full">
                        <label htmlFor="photo" className="block text-sm/6 font-medium text-white">
                            Photo
                        </label>
                        <div className="mt-2 flex items-center gap-x-3">
                            <UserCircleIcon aria-hidden="true" className="size-12 text-gray-500" />
                            <button
                                type="button"
                                className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                            >
                                Change
                            </button>
                        </div>
                    </div>

                </div>
            </div> */}

            <div className="border-b border-white/10 pb-12">
                <h2 className="text-base/7 font-semibold text-white">Personal Information</h2>
                <p className="mt-1 text-sm/6 text-gray-400">We use this information to contact you about your orders</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-white">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("first_name", { required: true })}
                                id="first_name"
                                name="first_name"
                                type="text"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                            />
                        </div>
                        {errors.first_name?.message && <FieldErrorDisplay error={errors.first_name?.message} />}
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm/6 font-medium text-white">
                            Last name
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("last_name")}
                                id="last_name"
                                name="last_name"
                                type="text"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                            />
                        </div>
                        {errors.last_name?.message && <FieldErrorDisplay error={errors.last_name?.message} />}
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                {...register("email", { required: true })}
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                disabled
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                            />
                        </div>
                        {errors.email?.message && <FieldErrorDisplay error={errors.email?.message} />}
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                            Phone Number
                        </label>

                        <div className="mt-2 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-white sm:text-sm">
                                +91
                            </span>
                            <input
                                {...register("phone_number", { required: true })}
                                id="phone_number"
                                name="phone_number"
                                type="number"
                                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 bg-white/5 py-1.5  text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {errors.phone_number?.message && <FieldErrorDisplay error={errors.phone_number?.message} />}
                    </div>
                </div>
            </div>

        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
            {/* <button type="button" className="text-sm/6 font-semibold text-white">
                Cancel
            </button> */}
            <button
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
                {isSubmitting ? <LoadingIndicator />
                    : "Save"}
            </button>
        </div>

        <div className="h-4" />
        <ToastContainer
            toastStyle={{ backgroundColor: "black", color: "white" }} />
    </form>;
}