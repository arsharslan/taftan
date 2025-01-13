import { IDish } from "@/models/dish";
import { classNames } from "@/utils/class_names";
import Link from "next/link";
import { useOnlineOrderContext } from "../online_order_context";
import { ChevronDownIcon, ChevronUpIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { DishSelected } from "../page";
import { useState } from "react";

export default function CategoryView({ category, dishes }: { category: string, dishes: IDish[] }) {

    const { dishesSelected, setDishesSelected, currentStep, setCurrentStep } = useOnlineOrderContext();
    const [show, setShow] = useState<boolean>(false);

    return <>
        <tr className="border-t border-gray-200">
            <th
                scope="colgroup"
                colSpan={5}
                className=" py-2 pl-4 pr-3 text-left text-sm font-semibold sm:pl-3"
            >
                <div className="flex items-center hover:cursor-pointer" onClick={() => {
                    setShow((prev) => !prev);
                }}>
                    <h2 className=" text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                        {category}
                    </h2>
                    {show ? <ChevronUpIcon className="h-8 w-8 ml-auto" /> : <ChevronDownIcon className="h-8 w-8 ml-auto" />}
                </div>
            </th>
        </tr>
        {show &&
            dishes?.map((dish, personIdx) => (
                <tr
                    key={dish._id}
                    className={classNames(personIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                >
                    <td className="py-4 pl-4 pr-3 text-sm font-medium  sm:pl-3">
                        {dish.name}
                    </td>
                    <td className="hidden lg:table-cell px-3 py-4 text-sm max-w-80">{dish.description}</td>
                    <td className=" px-3 py-4 text-sm ">
                        {`₹ ${dish.price}` }
                    </td>
                    <td className=" px-3 py-4 text-sm ">
                        {dish.quantity.map((quantity, index) => <div key={index} className="flex">
                            <p>{quantity.name}:{" "}</p>
                            <p>{quantity.quantity}</p>
                            <p>{quantity.unit}</p>
                        </div>)}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <div className="text-indigo-600 hover:text-indigo-900">
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
                    </td>
                </tr>
            ))
        }
    </>;


}