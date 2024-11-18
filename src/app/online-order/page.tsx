"use client";
import { IDish } from "@/models/dish";
import { fetchDishes } from "@/provider/api_provider";
import { classNames } from "@/utils/class_names";
import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OnlineOrderProvider, useOnlineOrderContext } from "./online_order_context";
import { SelectProductsView } from "./components/select_products";
import FinalView from "./components/final";

export interface DishSelected {
    dish: IDish;
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


    const { dishesSelected, setDishesSelected, currentStep } = useOnlineOrderContext();



    return <>
    {currentStep === 1 ? <SelectProductsView /> : <FinalView />}
    </>;
}

export default function OnlineOrder() {
    return <OnlineOrderProvider>
        <OnlineOrderView />
    </OnlineOrderProvider>;
}