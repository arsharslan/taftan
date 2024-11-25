import { Radio, RadioGroup } from "@headlessui/react";
import { useOnlineOrderContext } from "../online_order_context";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import Image from "next/image";
import { IDish } from "@/models/dish";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FieldErrorDisplay from "@/components/field_error";
import { patchCheckout } from "@/provider/api_provider";
import LoadingIndicator from "@/components/loading_indicator";
import { toast, ToastContainer } from "react-toastify";


export enum PaymentMode {
    online = "ONLINE",
    contact = "CONTACT"
}

export default function FinalView() {

    const { checkout, setCheckout, startDate, setStartDate, paymentMode, setPaymentMode } = useOnlineOrderContext();
    const [error, setError] = useState<string>();
    const [isConfirmingOrder, setIsConfirmingOrder] = useState<boolean>(false);

    const confirmOrder = async () => {
        setError(undefined);
        if (!startDate) {
            setError("Please select date of delivery");
            return;
        }
        setIsConfirmingOrder(true);
        const response = await patchCheckout({
            checkout: {
                _id: checkout?._id,
                payment_mode: paymentMode,
                requested_delivery_date: startDate
            }
        });
        if (response.data) {
            if (response.data.payment_mode === PaymentMode.contact) {
                toast("You will be contacted soon");
            }
            setCheckout(response.data);
        }
        setIsConfirmingOrder(false);
    }

    return <>
        <div className="text-gray-200">

            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight mb-4">
                    Confirm Order
                </h2>
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div>
                        <div className="border-gray-200">
                            <div className="border-gray-200">
                                <fieldset>
                                    <legend className="text-lg font-medium text-gray-200">Payment method</legend>
                                    <RadioGroup
                                        value={paymentMode}
                                        onChange={setPaymentMode}
                                        className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                                    >
                                        {[
                                            {
                                                title: "Online Payment (coming soon)",
                                                body: "Instant Order Placement",
                                                mode: PaymentMode.online,
                                                is_clickable: true
                                            },
                                            {
                                                title: "Request Call",
                                                body: "2-3 bussiness days",
                                                mode: PaymentMode.contact,
                                                is_clickable: true
                                            }
                                        ].map((deliveryMethod, index) => (
                                            <div key={index} className="flex cursor-pointer rounded-lg border border-gray-300 p-4"
                                                onClick={() => {
                                                    if (deliveryMethod.is_clickable) {
                                                        setPaymentMode(deliveryMethod.mode);
                                                    }
                                                }}
                                            >
                                                <span className="flex flex-1">
                                                    <span className="flex flex-col">
                                                        <span className="block text-sm font-medium ">{deliveryMethod.title}</span>
                                                        <span className="mt-1 flex items-center text-sm text-gray-500">
                                                            {deliveryMethod.body}
                                                        </span>
                                                    </span>
                                                </span>
                                                {deliveryMethod.mode === paymentMode && <CheckCircleIcon
                                                    aria-hidden="true"
                                                    className="size-5 text-indigo-600 [.group:not([data-checked])_&]:hidden"
                                                />}
                                                <span
                                                    aria-hidden="true"
                                                    className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                                />
                                            </div>
                                        )

                                            /* (
                                                <Radio
                                                    key={deliveryMethod.mode}
                                                    value={deliveryMethod}
                                                    aria-label={deliveryMethod.title}
                                                    className="group relative flex cursor-pointer rounded-lg border border-gray-300 p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-indigo-500"
                                                >
                                                    <span className="flex flex-1">
                                                        <span className="flex flex-col">
                                                            <span className="block text-sm font-medium ">{deliveryMethod.title}</span>
                                                            <span className="mt-1 flex items-center text-sm text-gray-500">
                                                                {deliveryMethod.body}
                                                            </span>
                                                        </span>
                                                    </span>
                                                    <CheckCircleIcon
                                                        aria-hidden="true"
                                                        className="size-5 text-indigo-600 [.group:not([data-checked])_&]:hidden"
                                                    />
                                                    <span
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                                    />
                                                </Radio>
                                            ) */
                                        )}
                                    </RadioGroup>
                                </fieldset>
                            </div>
                            <div className="mt-4  border-gray-200 pt-4">
                                <legend className="text-lg font-medium text-gray-200">Select Date</legend>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => {
                                        if (date) {
                                            setStartDate(date)
                                        }
                                    }}
                                    minDate={new Date()}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    className="bg-transparent rounded-lg mt-4"
                                />
                            </div>
                            {error && <FieldErrorDisplay error={error} />}
                            <h2 className="mt-4 pt-4 text-lg font-medium text-gray-200">Shipping information</h2>
                            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">

                                <div className="sm:col-span-2">
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-200">
                                        Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            readOnly
                                            value={checkout?.address?.name}
                                            type="text"
                                            className="block w-full rounded-md border-gray-300 bg-transparent text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-200">
                                        Street Address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            readOnly
                                            value={checkout?.address?.street_address}
                                            type="text"
                                            className="block w-full rounded-md border-gray-300 bg-transparent text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-200">
                                        Landmark
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            readOnly
                                            value={checkout?.address?.landmark}
                                            type="text"
                                            className="block w-full rounded-md border-gray-300 bg-transparent text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-200">
                                        City
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            readOnly
                                            value={checkout?.address?.city}
                                            type="text"
                                            className="block w-full rounded-md border-gray-300 bg-transparent text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-200">
                                        State
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            readOnly
                                            value={checkout?.address?.state}
                                            type="text"
                                            className="block w-full rounded-md border-gray-300 bg-transparent text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="company" className="block text-sm font-medium text-gray-200">
                                        PIN Code
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            readOnly
                                            value={checkout?.address?.pin_code}
                                            type="text"
                                            className="block w-full rounded-md border-gray-300 bg-transparent text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>



                    </div>
                    {/* Order summary */}
                    <div className="mt-10 lg:mt-0 text-gray-200">
                        <h2 className="text-lg font-medium text-gray-200">Order summary</h2>

                        <div className="mt-4 rounded-lg border border-gray-200 shadow-sm">
                            <h3 className="sr-only">Items in your cart</h3>
                            <ul role="list" className="divide-y divide-gray-200">
                                {checkout?.items?.map((product, index) => (
                                    <li key={index} className="flex px-4 py-6 sm:px-6">
                                        <div className="shrink-0">
                                            <Image
                                                src={(product.dish_id as IDish)?.image ?? ""}
                                                alt="dish"
                                                height={20}
                                                width={20}
                                            />
                                        </div>

                                        <div className="ml-6 flex flex-1 flex-col">
                                            <div className="flex">
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-sm">
                                                        <p className="font-medium text-gray-200">
                                                            {(product.dish_id as IDish)?.name ?? ""}
                                                        </p>
                                                    </h4>
                                                    {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                    <p className="mt-1 text-sm text-gray-500">{product.size}</p> */}
                                                </div>

                                                {/* <div className="ml-4 flow-root shrink-0">
                                                    <button
                                                        type="button"
                                                        className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Remove</span>
                                                        <TrashIcon aria-hidden="true" className="size-5" />
                                                    </button>
                                                </div> */}
                                            </div>

                                            <div className="flex flex-1 items-end justify-between pt-2">
                                                <p className="mt-1 text-sm font-medium text-gray-900">{product.dish?.price}</p>

                                                <div className="ml-4">
                                                    <label htmlFor="quantity" className="mr-2">
                                                        Quantity
                                                    </label>
                                                    {product.quantity}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Subtotal</dt>
                                    <dd className="text-sm font-medium">{checkout?.items?.reduce((x, y) => x + ((y.dish_id as IDish).price), 0) ?? ""}</dd>
                                </div>
                                {/* <div className="flex items-center justify-between">
                                    <dt className="text-sm">Shipping</dt>
                                    <dd className="text-sm font-medium">$5.00</dd>
                                </div>
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm">Taxes</dt>
                                    <dd className="text-sm font-medium">$5.52</dd>
                                </div> */}
                                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                    <dt className="text-base font-medium">Total</dt>
                                    <dd className="text-base font-medium">{checkout?.items?.reduce((x, y) => x + ((y.dish_id as IDish).price), 0) ?? ""}</dd>
                                </div>
                            </dl>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <button
                                    onClick={confirmOrder}
                                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    {isConfirmingOrder ? <LoadingIndicator /> : "Confirm order"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ToastContainer
            toastStyle={{ backgroundColor: "black", color: "white" }} />
    </>;
}