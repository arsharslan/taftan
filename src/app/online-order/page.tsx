"use client";
import firebase_app from "@/firebase/config"
import { fetchCheckouts } from "@/provider/api_provider";
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { use, useEffect, useState } from "react";
import { PaymentMode } from "./[id]/components/final";
import { ICheckout } from "@/models/checkout";
import Link from "next/link";
import { IDish } from "@/models/dish";
import displayDate from "@/utils/display_date";
import Image from "next/image";
import { CookiesProvider } from "@/provider/cookies_provider";
import { goldenColor } from "@/utils/colors";

export default function OnlineOrdersView() {

    const [checkouts, setCheckouts] = useState<ICheckout[]>();

    const getCheckouts = async () => {
        const userId = await CookiesProvider.getUserId();

        if (!userId) { return; }

        const response = await fetchCheckouts({
            user_id: userId,
            payment_mode: PaymentMode.contact
        });

        if (response.data) {
            setCheckouts(response.data);
        }
    }

    useEffect(() => {
        getCheckouts();
    }, []);

    return <div className="text-gray-200 flex flex-col">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        </div>
        <div className="py-16 mx-16">
            <div className="mx-auto sm:px-2 lg:px-8">
                <div className="mx-auto px-4 lg:px-0">
                    {/* <Image src={"/images/taftan_logo_alt-modified.png"} alt={""} height={100} width={100} className="mr-ato mb-4" /> */}

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Checkouts Pending</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        A list of all the checkouts for which you are yet to receive calls
                    </p>
                </div>
            </div>

            <div className="mt-16">
                <h2 className="sr-only">Checkouts</h2>
                <div className="mx-auto sm:px-2 lg:px-8">
                    <div className="mx-auto space-y-8 sm:px-4 lg:px-0">
                        {checkouts?.map((checkout, index) => (
                            <div
                                key={index}
                                className="border-b border-t border-gray-200  shadow-sm sm:rounded-lg sm:border"
                            >

                                <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                                    <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                                        {/* <div>
                                            <dt className="font-medium ">Order number</dt>
                                            <dd className="mt-1 text-gray-500">{checkout._id}</dd>
                                        </div> */}
                                        {checkout.createdAt && <div className="hidden sm:block">
                                            <dt className="font-medium ">Date placed</dt>
                                            <dd className="mt-1 text-gray-500">
                                                <time dateTime={checkout.createdAt}>{displayDate(checkout.createdAt)}</time>
                                            </dd>
                                        </div>}
                                        <div>
                                            <dt className="font-medium ">Total amount</dt>
                                            <dd className="mt-1 font-medium ">{checkout?.items?.reduce((x, y) => x + ((y.dish_id as IDish).price), 0) ?? ""}</dd>
                                        </div>
                                    </dl>

                                    <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                                        <Link
                                            href={`online-order/${checkout._id}`}
                                            className="flex items-center justify-center rounded-md border border-gray-300  px-2.5 py-2 text-sm font-medium shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            <span>View Order</span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Products */}
                                <h4 className="sr-only">Items</h4>
                                <ul role="list" className="divide-y divide-gray-200">
                                    {checkout?.items?.map((product, index) => {
                                        const dish = product.dish_id as IDish;
                                        return < li key={index} className="p-4 sm:p-6" >
                                            <div className="flex items-center sm:items-start">
                                                <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:size-40">
                                                    <img alt={"dish"} src={dish.image ?? ""} className="size-full object-cover" />
                                                </div>
                                                <div className="ml-6 flex-1 text-sm">
                                                    <div className="font-medium  sm:flex sm:justify-between">
                                                        <h5>{dish.name}</h5>
                                                        <p className="mt-2 sm:mt-0">{dish.price}</p>
                                                    </div>
                                                    <p className="hidden text-gray-500 sm:mt-2 sm:block">{dish.description}</p>
                                                </div>
                                            </div>

                                            {/* <div className="mt-6 sm:flex sm:justify-between">
                                                <div className="flex items-center">
                                                    <CheckCircleIcon aria-hidden="true" className="size-5 text-green-500" />
                                                    <p className="ml-2 text-sm font-medium text-gray-500">
                                                        Delivered on <time dateTime={order.deliveredDatetime}>{order.deliveredDate}</time>
                                                    </p>
                                                </div>

                                                <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                                                    <div className="flex flex-1 justify-center">
                                                        <a
                                                            href={product.href}
                                                            className="whitespace-nowrap text-indigo-600 hover:text-indigo-500"
                                                        >
                                                            View product
                                                        </a>
                                                    </div>
                                                    <div className="flex flex-1 justify-center pl-4">
                                                        <a href="#" className="whitespace-nowrap text-indigo-600 hover:text-indigo-500">
                                                            Buy again
                                                        </a>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </li>
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <footer className="sticky bottom-0 py-8 ml-auto mr-8">
            <Link
                href={`online-order/0`}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {"Create Order"}
            </Link>
        </footer>
    </div >
}