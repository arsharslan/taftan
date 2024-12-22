"use client";
import { ICheckout } from "@/models/checkout"
import { fetchAdminCheckouts } from "@/provider/api_provider";
import { useEffect, useState } from "react"
import { PaymentMode } from "../online-order/[id]/components/final";
import { IDish } from "@/models/dish";
import Link from "next/link";
import { IUser } from "@/models/user";
import Image from "next/image";

export default function OrdersReceivedView() {

    const [checkoutToReview, setCheckoutToReview] = useState<ICheckout[]>();

    const getCheckouts = async () => {
        const response = await fetchAdminCheckouts({
            payment_mode: PaymentMode.contact,
            is_paid: false
        });

        if (response.data) {
            setCheckoutToReview(response.data);
        }
    }

    useEffect(() => {
        getCheckouts();
    }, []);

    return <div className="">
        <div className="mx-auto max-w-7xl">
            <div className=" py-10">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            {/* <Image src={"/images/taftan_logo_alt-modified.png"} alt={""} height={100} width={100} className="mr-auto mb-4" /> */}
                            <h1 className="text-base font-semibold text-white">Checkouts Waiting for Approval</h1>
                            <p className="mt-2 text-sm text-gray-300">
                                A list of all the checkouts for which call has been requested
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                                Items
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                Phone Number
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                                Total
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                <span className="sr-only">View</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {checkoutToReview?.map((checkout, index) => {
                                            const user = checkout.user_id as IUser | null;
                                            return (
                                                <tr key={index}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                                        {checkout.items?.map((item, i) => {
                                                            const dish = item.dish_id as IDish;
                                                            return <div key={i}>{item.quantity} {dish.name}</div>;
                                                        })}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{user?.first_name}{" "}{user?.last_name}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{user?.phone_number}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{checkout?.items?.map((e) => ((e.dish_id as IDish).price ?? 0) * (e.quantity ?? 0)).reduce((x, y) => x + y) ?? ""}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                        <Link href={`/orders-received/${checkout._id}`} className="text-indigo-400 hover:text-indigo-300">
                                                            View<span className="sr-only"></span>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}