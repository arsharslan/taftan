import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { DishSelected } from "./page";
import { ICheckout } from "@/models/checkout";
import { PaymentMode } from "./components/final";

interface OnlineOrderContextType {
    dishesSelected: DishSelected[];
    setDishesSelected: Dispatch<SetStateAction<DishSelected[]>>;
    currentStep: number;
    setCurrentStep: Dispatch<SetStateAction<number>>;
    checkout: ICheckout | undefined;
    setCheckout: Dispatch<SetStateAction<ICheckout | undefined>>;
    startDate: Date | undefined;
    setStartDate: Dispatch<SetStateAction<Date | undefined>>;
    paymentMode: PaymentMode,
    setPaymentMode: Dispatch<SetStateAction<PaymentMode>>;
}

const OnlineOrderContext = createContext<OnlineOrderContextType | undefined>(undefined);

export const useOnlineOrderContext = () => {
    const context = useContext(OnlineOrderContext);
    if (context === undefined) {
        throw new Error("useOnlineOrderContext must be used within a OnlineOrderProvider");
    }
    return context;
}

export const OnlineOrderProvider = ({ children }: { children: ReactNode }) => {
    const [dishesSelected, setDishesSelected] = useState<DishSelected[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [checkout, setCheckout] = useState<ICheckout>();
    const [startDate, setStartDate] = useState<Date>();
    const [paymentMode, setPaymentMode] = useState<PaymentMode>(PaymentMode.contact);

    return (
        <OnlineOrderContext.Provider
            value={{
                dishesSelected,
                setDishesSelected,
                currentStep,
                setCurrentStep,
                checkout,
                setCheckout,
                startDate,
                setStartDate,
                paymentMode,
                setPaymentMode
            }}
        >{children}</OnlineOrderContext.Provider>
    );
}