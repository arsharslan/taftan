"use client";
import { IDish } from "@/models/dish";
import { fetchCheckout, fetchDishes } from "@/provider/api_provider";
import { classNames } from "@/utils/class_names";
import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OnlineOrderProvider, useOnlineOrderContext } from "./online_order_context";
import { SelectProductsView } from "./components/select_products";
import FinalView from "./components/final";
import SelectAddressView from "./components/select_address";
import PickLocation from "./components/pick_location";
import FillAddressForm from "./components/fill_address_form";

export interface DishSelected {
    dish_id?: string | IDish;
    dish?: IDish;
    quantity: number
}

const steps = [
    { name: 'Step 1', href: '#', status: 'complete' },
    { name: 'Step 2', href: '#', status: 'complete' },
    { name: 'Step 3', href: '#', status: 'current' },
    { name: 'Step 4', href: '#', status: 'upcoming' },
    { name: 'Step 5', href: '#', status: 'upcoming' },
]

const OnlineOrderView = () => {


    const { smallScreenFillAddressForm, smallScreenPickAddress, dishesSelected, setDishesSelected, currentStep, setCurrentStep, setCheckout, setStartDate, setPaymentMode } = useOnlineOrderContext();
    const params = useParams<{ id: string }>()
    const checkoutId: string | null = params?.id ?? null;

    const getChechkout = async () => {
        if (checkoutId === "0" || !checkoutId) { return; }
        const response = await fetchCheckout({ checkoutId });
        if (response.data) {
            setCheckout(response.data);
            if (response.data.requested_delivery_date) {
                setStartDate(new Date(response.data.requested_delivery_date));
            }
            if (response.data.payment_mode) {
                setPaymentMode(response.data.payment_mode);
            }

            if (response.data.address) {
                setCurrentStep(3);
            } else {
                setCurrentStep(2);
            }
        }
    }

    useEffect(() => {
        /* if (checkoutId !== "0") {
            setCurrentStep(2);
        } */
        getChechkout();
    }, []);

    return <>
        {currentStep === 1 ? <SelectProductsView /> :
            currentStep === 2 ? (<SelectAddressView />) :
                <FinalView />}
    </>;
}

export default function OnlineOrder({ params }: { params: any }) {
    return <OnlineOrderProvider>
        <OnlineOrderView />
    </OnlineOrderProvider>;
}