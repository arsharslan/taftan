import { IDish } from "@/models/dish";
import { classNames } from "@/utils/class_names";
import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
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

export function SelectProductsView() {

    const [dishes, setDishes] = useState<IDish[]>();
    const { dishesSelected, setDishesSelected, currentStep, setCurrentStep } = useOnlineOrderContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const router = useRouter();

    const getDishes = async () => {
        console.log("getting dishes")
        setIsLoading(true);
        const response = await fetchDishes();
        if (response.data) {
            console.log(response.data)
            setDishes(response.data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getDishes();
    }, []);

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


    return <div className="flex flex-col h-screen justify-between">
        {/* <nav aria-label="Progress justify-center">
            <ol role="list" className="flex items-center">
                {steps.map((step, stepIdx) => (
                    <li key={step.name} className={classNames(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
                        {step.status === 'complete' ? (
                            <>
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className="h-0.5 w-full bg-indigo-600" />
                                </div>
                                <a
                                    href="#"
                                    className="relative flex size-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900"
                                >
                                    <CheckIcon aria-hidden="true" className="size-5 text-white" />
                                    <span className="sr-only">{step.name}</span>
                                </a>
                            </>
                        ) : step.status === 'current' ? (
                            <>
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <a
                                    href="#"
                                    aria-current="step"
                                    className="relative flex size-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
                                >
                                    <span aria-hidden="true" className="size-2.5 rounded-full bg-indigo-600" />
                                    <span className="sr-only">{step.name}</span>
                                </a>
                            </>
                        ) : (
                            <>
                                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <a
                                    href="#"
                                    className="group relative flex size-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                                >
                                    <span aria-hidden="true" className="size-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                                    <span className="sr-only">{step.name}</span>
                                </a>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav> */}
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6  lg:max-w-7xl lg:px-8">
            <div className="">
                <ul className="list-disc border rounded-lg border-golden p-8 text-white space-y-2">
                    <li>
                        Taftan operates on a pre-booked, high-quality food delivery model, focusing on traditional Mughlai, Chinese and Indian cuisine. Customers are required to place orders 24 hours in advance through WhatsApp, phone calls, or our website. This ensures every dish is freshly prepared using premium ingredients to maintain authenticity and flavor.
                    </li>
                    {/*<br />
                    <li>
                        Our offerings include a carefully curated menu featuring items like Mutton Biryani, Chicken Biryani, Mutton Korma, Nihari, Kebabs, and desserts such as Zarda and Kheer. Each dish comes with clear weight specifications, ensuring transparency and customer satisfaction.
                    </li>
                    <br />

                    <li>
                        We cater to a variety of customer needs, from individual meals to larger group orders for special occasions. Delivery is available through our network or via delivery partners, with additional charges based on location.
                    </li>
                    <br />

                    <li>
                        To enhance convenience, we also provide ready-to-cook options like marinated fish, chicken, and kebab paste, allowing customers to enjoy restaurant-quality food at home.
                    </li>
                    <br />

                    <li>
                        {"Taftan ensures compliance with the highest hygiene and safety standards, as evidenced by our FSSAI certification. Our registered trademark further establishes our brand's credibility and commitment to excellence."}
                    </li>
                    <br />

                    <li>
                        By emphasizing quality, freshness, and convenience, Taftan’s model combines traditional culinary values with modern customer preferences, making it a trusted name in pre-booked online food services.
                    </li> */}
                </ul>
            </div>

            <h2 className="mt-8 text-2xl font-bold text-gray-300">Online Order</h2>

            {isLoading ? <LoadingIndicator /> : <div className="text-white grid grid-cols-1 gap-y-12 sm:gap-x-6 ">
                <table className="min-w-full">
                    <thead className="">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                Name
                            </th>
                            <th scope="col" className="hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Description
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Quantity
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {[
                            {
                                category: "Mutton Dishes",
                                dishes: dishes?.filter((x) => x.category === "Mutton Dishes"),
                            },
                            {
                                category: "Chicken Dishes",
                                dishes: dishes?.filter((x) => x.category === "Chicken Dishes"),
                            },
                            {
                                category: "Starters",
                                dishes: dishes?.filter((x) => x.category === "Starters"),
                            },
                            {
                                category: "Ready to Cook",
                                dishes: dishes?.filter((x) => x.category === "Ready to Cook"),
                            },
                            {
                                category: "Desserts",
                                dishes: dishes?.filter((x) => x.category === "Desserts"),
                            },
                        ].map((dishCollection, index) => (
                            <CategoryView key={index} category={dishCollection.category ?? ""} dishes={dishCollection.dishes ?? []} />
                        ))}
                    </tbody>
                </table>
            </div>}
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