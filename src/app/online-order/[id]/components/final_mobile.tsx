"use client";

import { useState } from "react";
import { useOnlineOrderContext } from "../online_order_context";
import { IDish } from "@/models/dish";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createOrder, createRazorpayOrder, patchCheckout, verifyRazorpayPayment } from "@/provider/api_provider";
import LoadingIndicator from "@/components/loading_indicator";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Script from "next/script";
import { ClockIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export enum PaymentMode {
    online = "ONLINE",
    contact = "CONTACT"
}

export default function FinalMobile() {
    const { checkout, setCheckout, startDate, setStartDate } = useOnlineOrderContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isInitiatingPayUPayment, setIsInitiatingPayUPayment] = useState(false);
    const [isInitiatingRazorpayPayment, setIsInitiatingRazorpayPayment] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string>();
    const [showPaymentGatewayDialog, setShowPaymentGatewayDialog] = useState(false);
    const [showDatePickerDialog, setShowDatePickerDialog] = useState(false);
    const [tmpDate, setTmpDate] = useState<Date>();
    const router = useRouter();

    const confirmOrder = async (paymentMode: PaymentMode) => {
        if (!startDate) {
            toast.error("Please select date of delivery");
            return;
        }
        setIsLoading(true);
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
                setSuccessMsg("Your order is ready and awaiting confirmation!");
            }
            setCheckout(response.data);
        }
        setIsLoading(false);
    };

    const initiatePayUPayment = async () => {
        if (!startDate) {
            toast.error("Please select date of delivery");
            return;
        }
        if (!checkout?._id) { return; }
        setIsInitiatingPayUPayment(true);
        const response = await createOrder(checkout!._id!);
        if (response.data) {
            document.open();
            document.write(response.data.data);
            document.close();
        }
        setIsInitiatingPayUPayment(false);
        setShowPaymentGatewayDialog(false);
    };

    const initiateRazorpayPayment = async () => {
        if (!startDate) {
            toast.error("Please select date of delivery");
            return;
        }
        if (!checkout?._id) { return; }
        setIsInitiatingRazorpayPayment(true);
        const response = await createRazorpayOrder(checkout!._id!);
        if (response.data && checkout.total && response.data.data.id) {
            const options = {
                key: process.env.RAZORPAY_ID,
                amount: checkout.total * 100,
                currency: "INR",
                order_id: response.data.data.id,
                name: response.data.user?.first_name,
                description: 'food-order',
                handler: async function (response: any) {
                    if (!checkout._id) { return; }

                    const verifyResponse = await verifyRazorpayPayment({
                        checkout_id: checkout._id,
                        order_creation_id: response.razorpay_order_id, 
                        razorpay_payment_id: response.razorpay_payment_id, 
                        razorpay_signature: response.razorpay_signature
                    });

                    if (verifyResponse.data) {
                        router.replace("/online-order");
                    } else {
                        toast("Couldn't Verify your Payment");
                    }
                },
                prefill: {
                    name: response.data.user?.first_name,
                    email: response.data.user?.email,
                    contact: response.data.user?.phone_number
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.on('payment.failed', function (response: any) {
                alert(response.error.description);
            });
            paymentObject.open();
        }
        setIsInitiatingRazorpayPayment(false);
        setShowPaymentGatewayDialog(false);
    };

    const getTotalItems = () => {
        return checkout?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
    };

    const formatPrice = (price: number) => {
        return `₹${price}`;
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-IN', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0A0101] via-[#1F0B0B] via-[#2A180A] to-[#4C2C15] text-white">
            {/* Header */}
            <div className="flex items-center justify-center pt-6 pb-4">
                <Image src="/images/start-design.png" alt="" height={48} width={48} className="" />
                <h1 className="text-xl font-bold text-white mx-4">Order Cart</h1>
                <Image src="/images/end-design.png" alt="" height={48} width={48} className="" />
            </div>

            <div className=" pb-24">
                {/* Food Items Section */}
                <div className="space-y-4 mb-6 px-4">
                    {checkout?.items?.map((product, index) => {
                        const dish = product.dish_id as IDish;
                        return  <div key={dish?._id} className="flex   p-3 items-center relative">
                        <div className="flex-[2] pr-3">
                            <div className="font-bold text-lg text-golden mb-1">{dish?.name}</div>
                            <div className="flex items-center">

                            <div className="font-semibold text-base mb-1 mr-1">₹{dish?.price}</div>
                            <span className="mb-0.5 text-xs font-normal text-gray-300 capitalize">({dish?.quantity.map((quantity) => `${quantity.name} ${quantity.quantity} ${quantity.unit}`).join(" | ")})</span>
                            </div>
                            <div className="text-xs text-gray-300 mb-2 line-clamp-2">{dish?.description}</div>
                        </div>
                        <div className="flex-[1] rounded-lg ml-2 flex justify-center ">
                            <Image src={dish?.image ?? "/images/dish1.jpg"} alt={dish?.name ?? ""} width={80} height={80} className="object-cover w-full h-32 rounded-lg" />
                            <div 
                            className="absolute bottom-0 "
                            >
                            </div>
                        </div>
                    </div>
                    })}
                </div>

                {/* Delivery Section */}
                <div className="bg-[#2A180A] p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-white">
                                Delivery to <span className="text-golden">Home</span>
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Select delivery date and time
                            </p>
                        </div>
                        <button
                            onClick={() => setShowDatePickerDialog(true)}
                            className="bg-golden text-black font-semibold px-4 py-2 rounded-lg flex items-center space-x-2"
                        >
                            <ClockIcon className="h-4 w-4" />
                            <span>Select</span>
                        </button>
                    </div>
                    {startDate && (
                        <div className="mt-2 p-2 bg-gray-700 rounded">
                            <p className="text-golden text-sm">
                                {formatDate(startDate)}
                            </p>
                        </div>
                    )}
                </div>

                {/* Price Details Section */}
                <div className=" p-4 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Price Details</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-300">
                                Items Total ({getTotalItems()} items)
                            </span>
                            <span className="text-white font-semibold">
                                {formatPrice(checkout?.sub_total || 0)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300 flex items-center">
                                Processing Fee
                                <InformationCircleIcon className="h-4 w-4 ml-1 text-gray-400" />
                            </span>
                            <span className="text-white font-semibold">
                                {formatPrice(checkout?.delivery_charges || 0)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-300">GST</span>
                            <span className="text-white font-semibold">
                                {formatPrice(checkout?.gst || 0)}
                            </span>
                        </div>
                        <div className="border-t border-gray-600 pt-3">
                            <div className="flex justify-between">
                                <span className="text-white font-bold text-lg">Grand Total</span>
                                <span className="text-white font-bold text-lg">
                                    {formatPrice(checkout?.total || 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            {/* Date Picker Dialog */}
            <Dialog open={showDatePickerDialog} onClose={() => setShowDatePickerDialog(false)} className="relative z-10">
                <DialogBackdrop className="fixed inset-0 bg-black/50" />
                <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                    <DialogPanel className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <DialogTitle className="text-xl font-semibold text-white mb-4">
                            Select Delivery Date & Time
                        </DialogTitle>
                        <div className="mb-6">
                            <DatePicker
                                selected={tmpDate || startDate}
                                onChange={(date) => {
                                    if (date) {
                                        setTmpDate(date);
                                    }
                                }}
                                minDate={new Date()}
                                showTimeSelect
                                dateFormat="Pp"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                placeholderText="Select date and time"
                            />
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowDatePickerDialog(false)}
                                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (tmpDate) {
                                        setStartDate(tmpDate);
                                        setShowDatePickerDialog(false);
                                    }
                                }}
                                className="flex-1 bg-golden text-black py-2 px-4 rounded-lg font-semibold"
                            >
                                Confirm
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Payment Gateway Dialog */}
            <Dialog open={showPaymentGatewayDialog} onClose={() => setShowPaymentGatewayDialog(false)} className="relative z-10">
                <DialogBackdrop className="fixed inset-0 bg-black/50" />
                <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                    <DialogPanel className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <DialogTitle className="text-xl font-semibold text-white mb-4 text-center">
                            Select Payment Method
                        </DialogTitle>
                        <div className="space-y-3">
                            <button
                                onClick={initiateRazorpayPayment}
                                disabled={isInitiatingRazorpayPayment}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isInitiatingRazorpayPayment ? <LoadingIndicator /> : "Pay Online (Razorpay)"}
                            </button>
                            <button
                                onClick={initiatePayUPayment}
                                disabled={isInitiatingPayUPayment}
                                className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-700 disabled:opacity-50"
                            >
                                {isInitiatingPayUPayment ? <LoadingIndicator /> : "Pay Online (PayU)"}
                            </button>
                            <button
                                onClick={() => confirmOrder(PaymentMode.contact)}
                                disabled={isLoading}
                                className="w-full bg-golden text-black py-3 px-4 rounded-lg font-semibold hover:bg-golden/90 disabled:opacity-50"
                            >
                                {isLoading ? <LoadingIndicator /> : "Request Call"}
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Success Dialog */}
            <Dialog open={!!successMsg} onClose={() => setSuccessMsg(undefined)} className="relative z-10">
                <DialogBackdrop className="fixed inset-0 bg-black/50" />
                <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                    <DialogPanel className="bg-gray-800 rounded-lg p-6 w-full max-w-md text-center">
                        <div className="w-24 h-24 mx-auto mb-4">
                            <DotLottieReact
                                src="/images/wait_for_call.lottie"
                                loop
                                autoplay
                            />
                        </div>
                        <DialogTitle className="text-xl font-semibold text-white mb-2">
                            {successMsg}
                        </DialogTitle>
                        <p className="text-gray-400 mb-6">
                            Please be available on your phone number
                        </p>
                        <button
                            onClick={() => {
                                setSuccessMsg(undefined);
                                router.push("/online-order");
                            }}
                            className="w-full bg-golden text-black py-3 px-4 rounded-lg font-semibold"
                        >
                            Go to Orders
                        </button>
                    </DialogPanel>
                </div>
            </Dialog>

            <ToastContainer
                toastStyle={{ backgroundColor: "black", color: "white" }}
            />

            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />

<div className="fixed bottom-4 left-4 right-4 text-white"> 

<button
                    onClick={() => {
                        if (!startDate) {
                            toast.error("Please select delivery date and time");
                            setShowDatePickerDialog(true);
                            return;
                        }
                        setShowPaymentGatewayDialog(true);
                    }}
                    disabled={isLoading}
                    className="w-full bg-golden-background text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-golden-background/90 transition-colors disabled:opacity-50"
                >
                    {isLoading ? <LoadingIndicator /> : "Place Order"}
                </button>
</div>
        </div>
    );
} 