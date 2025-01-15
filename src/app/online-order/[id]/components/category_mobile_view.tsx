import { IDish } from "@/models/dish";
import { useOnlineOrderContext } from "../online_order_context";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { DishSelected } from "../page";
import { generateUniqSerial } from "@/utils/unique";

export default function CategoryMobileView({ category, dishes }: { category: string, dishes: IDish[] }) {

    const { dishesSelected, setDishesSelected, currentStep, setCurrentStep } = useOnlineOrderContext();
    const [show, setShow] = useState<boolean>(false);

    return <div className="text-gray-300">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-xl font-bold ">{category}</h2>
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {dishes.map((dish, index) => (
                    <div key={generateUniqSerial()}>
                        <div className="">
                            <div className="flex items-center mt-4">
                                <h3 className="text-sm font-bold ">{dish.name}</h3>
                                <p className="ml-auto text-lg font-semibold text-white">₹ {dish.price}</p>
                            </div>
                            <div className=" inset-x-0 top-0 flex items-end justify-end overflow-hidden rounded-lg p-4">
                                <div
                                    aria-hidden="true"
                                    className=" inset-x-0 bottom-0 bg-gradient-to-t from-black opacity-50"
                                />
                                <p className="mt-1 text-sm">{dish.description}</p>

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
                                        className="relative flex-1 items-center rounded-l-md  px-3 py-2 text-sm font-semibold ring-inset bg-black ring-golden ring-2 text-white hover:text-golden focus:z-10"
                                    >
                                        <MinusIcon className="h-4 w-4 mx-auto" />
                                    </button>
                                    <button
                                        type="button"
                                        className="relative -ml-px flex-1 items-center px-3 py-2 text-sm font-semibold ring-inset bg-black ring-golden ring-2 text-white hover:text-golden focus:z-10"
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
                                        className="relative -ml-px flex-1 items-center rounded-r-md px-3 py-2 text-sm font-semibold ring-inset bg-black ring-golden ring-2 text-white hover:text-golden focus:z-10"
                                    >
                                        <PlusIcon className="h-4 w-4 mx-auto" />
                                    </button>
                                </span>
                                : <div className="flex">
                                    {/* <CustomButton text="Add to Cart"/> */}
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
                                        className="flex-1  relative flex items-center justify-center rounded-md border border-transparent  px-8 py-2 text-sm font-medium bg-black ring-golden ring-2 text-white hover:text-golden "
                                    >
                                        Add to Cart<span className="sr-only">, {dish.name}</span>
                                    </button>
                                </div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>;
}