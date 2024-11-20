import { IDish } from "@/models/dish";
import { classNames } from "@/utils/class_names";
import { CheckIcon, MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useOnlineOrderContext } from "../online_order_context";
import { DishSelected } from "../page";
import { fetchDishes, postCheckout } from "@/provider/api_provider";
import { toast, ToastContainer } from "react-toastify";
import LoadingIndicator from "@/components/loading_indicator";
import { useRouter } from "next/navigation";

export function SelectProductsView() {

    const [dishes, setDishes] = useState<IDish[]>();
    const { dishesSelected, setDishesSelected, currentStep, setCurrentStep } = useOnlineOrderContext();

    const router = useRouter();

    const getDishes = async () => {
        const response = await fetchDishes();
        if (response.data) {
            setDishes(response.data);
        }
    }

    useEffect(() => {
        getDishes();
    }, []);

    const [isCreatingCheckout, setIsCreatingCheckout] = useState<boolean>(false);
    const createCheckout = async () => {
        setIsCreatingCheckout(true);
        const response = await postCheckout({
            checkout: {
                user_id: localStorage.getItem("user_id") ?? "",
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
            router.push(`/online-order/${response.data._id}`);
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
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold text-gray-300">Select your dish</h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {dishes?.map((dish, index) => (
                    <div key={index}>
                        <div className="relative">
                            <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                {dish.image && <img alt={"dish"} src={dish.image ?? ""} className="size-full object-cover" />}
                            </div>
                            <div className="relative mt-4">
                                <h3 className="text-sm font-medium text-gray-300">{dish.name}</h3>
                                <p className="mt-1 text-sm text-gray-500 text-ellipsis line-clamp-2">{dish.description}</p>
                            </div>
                            <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                />
                                <p className="relative text-lg font-semibold text-white">{dish.price}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            {dishesSelected.some((x) => x.dish?._id === dish._id) ?

                                <span className="flex rounded-md shadow-sm">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDishesSelected((prev) => {
                                                const updatedDishSelected = prev.find((x) => x.dish?._id === dish._id);
                                                if (updatedDishSelected?.quantity === dish.min_order) {
                                                    return [...prev.filter((x) => x.dish?._id !== dish._id)];
                                                } else {
                                                    let quantity = (updatedDishSelected?.quantity ?? 0);
                                                    return [
                                                        ...prev.filter((x) => x.dish?._id !== dish._id),
                                                        {
                                                            dish,
                                                            quantity: --quantity
                                                        }
                                                    ];
                                                }
                                            })
                                        }}
                                        className="relative flex-1 items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                    >
                                        <MinusIcon className="h-4 w-4 mx-auto" />
                                    </button>
                                    <button
                                        type="button"
                                        className="relative -ml-px flex-1 items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                    >
                                        {dishesSelected.find((x) => x.dish?._id === dish._id)?.quantity}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDishesSelected((prev) => {
                                                const updatedDishSelected = prev.find((x) => x.dish?._id === dish._id);
                                                let quantity = (updatedDishSelected?.quantity ?? 0);
                                                return [
                                                    ...prev.filter((x) => x.dish?._id !== dish._id),
                                                    {
                                                        dish,
                                                        quantity: ++quantity
                                                    }
                                                ];

                                            })
                                        }}
                                        className="relative -ml-px flex-1 items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                    >
                                        <PlusIcon className="h-4 w-4 mx-auto" />
                                    </button>
                                </span>
                                : <div className="flex">
                                    <button

                                        onClick={() => {
                                            setDishesSelected((prev) => {
                                                const newDishSelected: DishSelected = {
                                                    dish,
                                                    quantity: dish.min_order
                                                };
                                                return [
                                                    ...prev,
                                                    newDishSelected
                                                ];
                                            });
                                        }}
                                        className="flex-1 relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                                    >
                                        Add to Cart<span className="sr-only">, {dish.name}</span>
                                    </button>
                                </div>}

                        </div>
                    </div>
                ))}
            </div>
        </div>
        {dishesSelected.length > 0 && <footer className="sticky bottom-0 py-8 ml-auto mr-8">
            <button
                type="button"
                onClick={createCheckout}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {isCreatingCheckout ? <LoadingIndicator /> : "Place Order"}
            </button>
        </footer>}
        <ToastContainer
            toastStyle={{ backgroundColor: "black", color: "white" }} />
    </div>;
}