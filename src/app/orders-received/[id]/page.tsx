"use client";
import { SleekButton } from "@/components/custom_button";
import { ICheckout } from "@/models/checkout";
import { IDish } from "@/models/dish";
import { IUser } from "@/models/user";
import { fetchAdminCheckout } from "@/provider/api_provider";
import displayDate from "@/utils/display_date";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderReceivedDetailView() {
    const params = useParams<{ id: string }>()
    const checkoutId: string | null = params?.id ?? null;
    const [checkout, setCheckout] = useState<ICheckout>();

    const getCheckout = async () => {
        if (!checkoutId) { return; }

        const response = await fetchAdminCheckout({
            checkoutId
        });

        if (response.data) {
            setCheckout(response.data);
        }
    }


    useEffect(() => {
        getCheckout();
    }, []);

    return <div className="text-gray-300 flex flex-col">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
            <div className="max-w-xl">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Checkout Detail</h1>
                <p className="mt-2 text-sm text-gray-500">
                    You can confirm this checkout
                </p>
            </div>

            <div className="mt-16">
                <h2 className="sr-only">Recent orders</h2>

                <div className="space-y-20">
                    <div>

                        <div className="rounded-lg border border-gray-50 px-4 py-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                            <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm sm:grid sm:grid-cols-4 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:flex-none lg:gap-x-8">
                                {checkout?.createdAt && <div className="flex justify-between sm:block">
                                    <dt className="font-medium ">Date placed</dt>
                                    <dd className="sm:mt-1">
                                        <time dateTime={checkout.createdAt}>{displayDate(checkout?.createdAt)}</time>
                                    </dd>
                                </div>}
                                {checkout?.requested_delivery_date && <div className="flex justify-between sm:block">
                                    <dt className="font-medium ">Delivery Requested</dt>
                                    <dd className="sm:mt-1">
                                        <time >{displayDate(checkout?.requested_delivery_date)}</time>
                                    </dd>
                                </div>}
                                <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                    <dt className="font-medium ">Customer</dt>
                                    <dd className="sm:mt-1">{(checkout?.user_id as IUser)?.first_name} {(checkout?.user_id as IUser)?.last_name} {(checkout?.user_id as IUser)?.phone_number}</dd>
                                </div>
                                <div className="flex justify-between pt-6 font-medium  sm:block sm:pt-0">
                                    <dt>Total amount</dt>
                                    <dd className="sm:mt-1">{checkout?.items?.reduce((x, y) => x + ((y.dish_id as IDish).price), 0) ?? ""}</dd>
                                </div>
                            </dl>
                        </div>

                        <table className="mt-4 w-full  sm:mt-6">
                            <caption className="sr-only">Products</caption>
                            <thead className="sr-only text-left text-sm  sm:not-sr-only">
                                <tr>
                                    <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                                        Product
                                    </th>
                                    <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                                        Price
                                    </th>
                                    <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                                        Quantity
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                                {checkout?.items?.map((item, index) => {
                                    const dish = item.dish_id as IDish;
                                    return (
                                        <tr key={index}>
                                            <td className="py-6 pr-8">
                                                <div className="flex items-center">
                                                    <img
                                                        alt={"dish"}
                                                        src={dish.image ?? ""}
                                                        className="mr-6 size-16 rounded object-cover"
                                                    />
                                                    <div>
                                                        <div className="font-medium text-gray-900">{dish.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden py-6 pr-8 sm:table-cell">{dish.price}</td>
                                            <td className="hidden py-6 pr-8 sm:table-cell">{item.quantity}</td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <footer className="sticky bottom-0 py-8 ml-auto mr-8">
            <Link
                href={`online-order/0`}
            >
                <SleekButton text="Confirm Order" />
            </Link>
        </footer>
    </div>;
}