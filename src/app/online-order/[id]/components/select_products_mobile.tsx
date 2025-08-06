import { IDish } from "@/models/dish";
import { useEffect, useState } from "react";
import { useOnlineOrderContext } from "../online_order_context";
import { fetchDishes, postCheckout } from "@/provider/api_provider";
import Image from "next/image";
import { CookiesProvider } from "@/provider/cookies_provider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import LoadingIndicator from "@/components/loading_indicator";

enum SelectedMenu {
    MUGHLAI = "MUGHLAI",
    CHINESE = "CHINESE"
}

const SelectProductsMobile = () => {
    const [dishes, setDishes] = useState<IDish[]>();
    const { dishesSelected, setDishesSelected, setCurrentStep } = useOnlineOrderContext();
    const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>(SelectedMenu.MUGHLAI);
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCreatingCheckout, setIsCreatingCheckout] = useState<boolean>(false);
    const router = useRouter();
    
    useEffect(() => {
        setDishesSelected([]);
        getDishes();
    }, [selectedMenu]);

    const getDishes = async () => {
        setIsLoading(true);
        const response = await fetchDishes({ main_category: selectedMenu.toString() });
        if (response.data) {
            setDishes(response.data);
            // Default to first category
            if (response.data.length > 0) {
                setSelectedCategory(response.data[0].category);
            }
        }
        setIsLoading(false);
    };

    const getCategories = () => {
        const categories: string[] = [];
        for (let dish of dishes ?? []) {
            if (!categories.includes(dish.category)) {
                categories.push(dish.category);
            }
        }
        return categories;
    };

    const handleAdd = (dish: IDish) => {
        setDishesSelected((prev: any) => {
            const existing = prev.find((d: any) => d.dish?._id === dish._id);
            if (existing) {
                return prev.map((d: any) => 
                    d.dish?._id === dish._id 
                        ? { ...d, quantity: d.quantity + 1 }
                        : d
                );
            }
            return [...prev, { dish, quantity: 1 }];
        });
    };

    const handleRemove = (dish: IDish) => {
        setDishesSelected((prev: any) => {
            const existing = prev.find((d: any) => d.dish?._id === dish._id);
            if (existing && existing.quantity > 1) {
                return prev.map((d: any) => 
                    d.dish?._id === dish._id 
                        ? { ...d, quantity: d.quantity - 1 }
                        : d
                );
            } else if (existing && existing.quantity === 1) {
                return prev.filter((d: any) => d.dish?._id !== dish._id);
            }
            return prev;
        });
    };

    const getSelectedQuantity = (dishId: string) => {
        const selected = dishesSelected.find((d: any) => d.dish?._id === dishId);
        return selected ? selected.quantity : 0;
    };

    const getTotalPrice = () => {
        return dishesSelected.reduce((total: number, item: any) => {
            return total + (item.dish?.price || 0) * item.quantity;
        }, 0);
    };

    const getTotalItems = () => {
        return dishesSelected.reduce((total: number, item: any) => {
            return total + item.quantity;
        }, 0);
    };

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

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0A0101] via-[#1F0B0B] via-[#2A180A] to-[#4C2C15] text-white">
            {/* Menu Type Selection */}
            <div className="flex justify-center gap-4 mt-6">
                {Object.values(SelectedMenu).map((menu) => (
                    <button
                        key={menu}
                        onClick={() => setSelectedMenu(menu)}
                        className={`px-3 py-2 rounded-lg font-semibold border transition-all duration-200 bg-gray-900 bg-opacity-60 ${selectedMenu === menu ? " text-foreground-color border-foreground-color" : " border-transparent text-white"}`}
                    >
                        <div className="flex items-center">
                            <Image src={`/images/${menu.toLowerCase()}_menu.png`} alt={menu} width={32} height={32} className=""/>
                            <span className="ml-1 capitalize">{menu.toLowerCase()} Menu</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto gap-6 mt-6 px-4 scrollbar-hide">
                {getCategories().map((category) => (
                    <div key={category} className="flex flex-col items-center">
                        <button
                            onClick={() => setSelectedCategory(category)}
                            className={`whitespace-nowrap px-2 py-2 font-medium transition-all duration-200 ${selectedCategory === category ? "text-golden" : "text-white"}`}
                        >
                            {category}
                        </button>
                        {selectedCategory === category && (
                            <div className="w-full h-0.5 bg-golden mt-1"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Dish Cards */}
            <div className="flex-1 overflow-y-auto px-2 mt-4 pb-24">
                {isLoading ? (
                    <div className="flex justify-center items-center h-40">Loading...</div>
                ) : (
                    <div className="flex flex-col gap-4 divide-y divide-gray-700">
                        {dishes?.filter((x) => x.category === selectedCategory).map((dish) => (
                            <div key={dish._id} className="flex   p-3 items-center relative">
                                <div className="flex-[2] pr-3">
                                    <div className="font-bold text-lg text-golden mb-1">{dish.name}</div>
                                    <div className="flex items-center">

                                    <div className="font-semibold text-base mb-1 mr-1">₹{dish.price}</div>
                                    <span className="mb-0.5 text-xs font-normal text-gray-300 capitalize">({dish.quantity.map((quantity) => `${quantity.name} ${quantity.quantity} ${quantity.unit}`).join(" | ")})</span>
                                    </div>
                                    <div className="text-xs text-gray-300 mb-2 line-clamp-2">{dish.description}</div>
                                </div>
                                <div className="flex-[1] rounded-lg ml-2 flex justify-center ">
                                    <Image src={dish.image ?? "/images/dish1.jpg"} alt={dish.name} width={80} height={80} className="object-cover w-full h-32 rounded-lg" />
                                    <div 
                                    className="absolute bottom-0 "
                                    >
{getSelectedQuantity(dish._id ?? "") > 0 ? 
                                    (
                                        <div 
                                        className="  bg-golden-background text-white font-normal px-4 py-0.5 rounded-lg flex items-center gap-1 shadow-md"
                                        >
                                            <button 
                                                onClick={() => handleRemove(dish)}
                                                className="w-6 h-6 flex items-center justify-center rounded-full  bg-opacity-20 hover:bg-opacity-30"
                                            >
                                                -
                                            </button>
                                            <span className="min-w-[20px] text-center">{getSelectedQuantity(dish._id ?? "")}</span>
                                            <button 
                                                onClick={() => handleAdd(dish)}
                                                className="w-6 h-6 flex items-center justify-center rounded-full  bg-opacity-20 hover:bg-opacity-30"
                                            >
                                                +
                                            </button>
                                        </div>
                                    )
                                    : <button
    className="   bg-golden-background text-white font-normal px-4 py-0.5 rounded-lg flex items-center gap-1 shadow-md"
    onClick={() => handleAdd(dish)}
  >
    Add <span className="text-xl leading-none">+</span>
  </button>}
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {dishesSelected.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 border-t border-gray-700 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="text-white flex items-center">
                            <div className="font-semibold text-lg mr-2">₹{getTotalPrice()}</div>
                            <div className="text-sm text-gray-300">({getTotalItems()} items)</div>
                        </div>
                        {isCreatingCheckout ? <LoadingIndicator /> : <button 
                            className=" text-foreground-color  py-2 rounded-lg font-semibold flex items-center gap-2"
                            onClick={createCheckout}
                        >
                            Proceed to order
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </button>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectProductsMobile;