"use client"
import { verifyPayment } from "@/provider/api_provider";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const SuccessViewCore = () => {
    const searchParams = useSearchParams()
    const checkoutId = searchParams?.get("checkout_id");
    const txnid = searchParams?.get("txnid");
    const router = useRouter();

    useEffect(() => {
        verifyPaymentF();
    }, []);

    const verifyPaymentF = async () => {
        if (!checkoutId || !txnid) { return; }
        const response = await verifyPayment(checkoutId, txnid);
        if (response.data?.new_checkout?.is_paid === true) {
            router.replace("/online-order");
        }
    }


    return <div className="flex flex-col items-center">
        <div className="w-64">
            <DotLottieReact
                src="https://lottie.host/da04a8ab-5bce-4c79-8e13-578b2aec8ad6/erX0g5uVEK.lottie"
                // loop
                autoplay
            />
            <h3 className="mt-8 text-3xl text-center font-semibold text-gray-200">Your Payment was successfull!</h3>
            <h3 className="mt-8 text-base text-center font-semibold text-gray-400">Redirecting you to order list page</h3>
        </div>
    </div>
}

export default function SuccessView() {
    return <Suspense>
        <SuccessViewCore />
    </Suspense>;
}