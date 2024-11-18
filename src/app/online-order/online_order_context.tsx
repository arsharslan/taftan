import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { DishSelected } from "./page";

interface OnlineOrderContextType {
    dishesSelected: DishSelected[];
    setDishesSelected: Dispatch<SetStateAction<DishSelected[]>>;
    currentStep: number;
    setCurrentStep: Dispatch<SetStateAction<number>>;
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

    return (
        <OnlineOrderContext.Provider
            value={{
                dishesSelected,
                setDishesSelected,
                currentStep,
                setCurrentStep
            }}
        >{children}</OnlineOrderContext.Provider>
    );
}