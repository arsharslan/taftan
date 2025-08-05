import { IDish } from "@/models/dish";
import { classNames } from "@/utils/class_names";
import { CheckCircleIcon, CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import { Fragment, useEffect, useState } from "react";
import { useOnlineOrderContext } from "../online_order_context";
import { DishSelected } from "../page";
import { fetchDishes, postCheckout } from "@/provider/api_provider";
import { toast, ToastContainer } from "react-toastify";
import LoadingIndicator from "@/components/loading_indicator";
import { useRouter } from "next/navigation";
import { CookiesProvider } from "@/provider/cookies_provider";
import { CustomButton } from "@/components/custom_button";
import Link from "next/link";
import CategoryView from "./category_view";
import CategoryMobileView from "./category_mobile_view";
import { generateUniqSerial } from "@/utils/unique";
import { Radio, RadioGroup } from "@headlessui/react";
import Image from "next/image";
import SelectProductsMobile from "./select_products_mobile";

enum SelectedMenu {
    MUGHLAI = "MUGHLAI",
    CHINESE = "CHINESE"
}

function SelectProductsDesktopView() {


    const [dishes, setDishes] = useState<IDish[]>();
    const { dishesSelected, setDishesSelected, currentStep, setCurrentStep } = useOnlineOrderContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>(SelectedMenu.MUGHLAI);

    const router = useRouter();

    const getCategories = () => {
        const categories: string[] = [];
        for (let dish of dishes ?? []) {
            if (!categories.includes(dish.category)) {
                categories.push(dish.category);
            }
        }
        return categories;
    }

    const getDishes = async () => {
        setIsLoading(true);
        const response = await fetchDishes({ main_category: selectedMenu.toString() });
        if (response.data) {
            setDishes(response.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setDishesSelected([]);
        getDishes();
    }, [selectedMenu]);

    const [isCreatingCheckout, setIsCreatingCheckout] = useState<boolean>(false);

    const createCheckout = async () => {
        const userId = await CookiesProvider.getUserId();
        setIsCreatingCheckout(true);
        const response = await postCheckout({
            checkout: {
                user_id: userId,
                items: dishesSelected.map((e) => {
                    return {
                        dish_id: e.dish?._id ?? undefined,
                        quantity: e.quantity
                    };
                })
            }
        });
        if (response.data) {
            setCurrentStep(2);
            toast("Checkout created successfully!");
            if (userId) {
                router.push(`/online-order/${response.data._id}`);
            } else {
                router.push(`/sign-in/?redirect=online-order/${response.data._id}`);
            }
        } else {
            toast("Error Occurred while creating checkout");
        }
        setIsCreatingCheckout(false);
    }

    const [selectedCategory, setSelectedCategory] = useState<string>();


    return <div className="flex flex-col h-screen justify-between text-white">

        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6  lg:max-w-7xl lg:px-8">

            <div className="flex items-center justify-center">
                <Image src={"/images/start-design.png"} alt={""} height={128} width={128} className="" />
                <div className="text-2xl font-bold text-center mx-8">
                    Select Menu Type
                </div>
                <Image src={"/images/end-design.png"} alt={""} height={128} width={128} className="" />
            </div>

            <div className="h-8" />

            <div className="flex text-gray-200 items-center justify-center">
                <fieldset>
                    <RadioGroup
                        value={selectedMenu}
                        onChange={(e) => {
                            setSelectedMenu(e);
                        }}
                        className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                    >
                        {Object.values(SelectedMenu).map((menu, index) => <div key={index}
                            onClick={() => {
                                setSelectedMenu(menu)
                            }}
                            className={`hover:cursor-pointer bg-gray-900 bg-opacity-60 rounded-lg border ${selectedMenu === menu ? "border-foreground-color" : "border-transparent"} p-4 flex items-center justify-center`}>
                            <div className={`font-bold  flex items-center ${menu === selectedMenu ? "text-golden" : ""}`}>
                                <Image src={`/images/${menu.toLowerCase()}_menu.png`} alt={""} height={32} width={32} className="mr-2" />
                                <div className="capitalize">
                                    {`${menu.toLowerCase()} Menu`}
                                </div>
                            </div>
                        </div>)}
                    </RadioGroup>
                </fieldset>
            </div>

            <div className="h-8" />

            <div className="">
                <ul className="list-disc border rounded-lg border-golden p-8 text-white space-y-2">
                    <li>
                        Taftan operates on a pre-booked, high-quality food delivery model, focusing on traditional Mughlai, Chinese and Indian cuisine. Customers are required to place orders 24 hours in advance through WhatsApp, phone calls, or our website. This ensures every dish is freshly prepared using premium ingredients to maintain authenticity and flavor.
                    </li>
                </ul>
            </div>

            <div className="h-4"/>

            <div className="bg-black bg-opacity-60 flex items-center justify-evenly p-2 rounded-lg">
                {getCategories().map((category, index) => <div 
                onClick={() => {
                    setSelectedCategory(category)
                }}
                className={`hover:cursor-pointer rounded-lg py-2 px-4 ${selectedCategory === category ? "bg-golden-background" : ""} `} key={index}>
                    {category}
                </div>)}
            </div>

            <div className="h-4"/>

            <div className="grid grid-cols-2 gap-4">
                {dishes?.filter((x) => x.category === selectedCategory).map((dish, index) => <div key={index} className="flex bg-black bg-opacity-60 rounded-lg  p-2">
                    <div className="h-32 w-32 ">

                    <Image src={dish.image ?? "https://images.pexels.com/photos/12737808/pexels-photo-12737808.jpeg"} alt={""} height={128} width={128} className="h-32 w-32 rounded-lg object-cover"/>
                    </div>
                </div>)}
            </div>


            <div className="hidden sm:block">
                {isLoading ? <LoadingIndicator /> : <div className="text-white grid grid-cols-1 gap-y-12 sm:gap-x-6 ">
                    <table className="min-w-full">
                        <thead className="">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-3">
                                    Name
                                </th>
                                <th scope="col" className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                                    Description
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                                    Price
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                                    Quantity
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {
                                getCategories().map((e) => {
                                    return {
                                        category: e,
                                        dishes: dishes?.filter((x) => x.category === e),
                                    }
                                }).map((dishCollection, index) => <CategoryView key={`${dishCollection.category}L`} category={dishCollection.category ?? ""} dishes={dishCollection.dishes ?? []} />
                                )}
                        </tbody>
                    </table>
                </div>}
            </div>
            <div className="block sm:hidden">
                {isLoading ? <LoadingIndicator /> : <>
                    {getCategories().map((e) => {
                        return {
                            category: e,
                            dishes: dishes?.filter((x) => x.category === e),
                        }
                    }).map((e, index) => <CategoryMobileView key={`${e.category}S`} category={e.category} dishes={e.dishes ?? []} />)}
                </>}
            </div>
        </div>
        {
            dishesSelected.length > 0 && <footer className="sticky bottom-0 py-8 ml-auto mr-8">
                {isCreatingCheckout ? <LoadingIndicator /> : <CustomButton text="Place Order" onClick={createCheckout} />}
                {/* <button
                type="button"
                onClick={createCheckout}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {isCreatingCheckout ? <LoadingIndicator /> : "Place Order"}
            </button> */}
            </footer>
        }
        <ToastContainer
            toastStyle={{ backgroundColor: "black", color: "white" }} />
    </div >;
}

export function SelectProductsView() {
    return (
        <>
            {/* Mobile View */}
            <div className="block sm:hidden">
                <SelectProductsMobile />
            </div>
            {/* Desktop/Tablet View */}
            <div className="hidden sm:block">
                <SelectProductsDesktopView />
            </div>
        </>
    );
}
