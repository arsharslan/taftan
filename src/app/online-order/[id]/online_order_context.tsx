import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { DishSelected } from "./page";
import { ICheckout } from "@/models/checkout";
import { PaymentMode } from "./components/final";
import { Control, FieldErrors, useForm, UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
    showMap: boolean;
    setShowMap: Dispatch<SetStateAction<boolean>>;
    coordinates: number[] | undefined,
    setCoordinates: Dispatch<SetStateAction<number[] | undefined>>;
    register: UseFormRegister<AddressForm>,
    reset: UseFormReset<AddressForm>,
    handleSubmit: UseFormHandleSubmit<AddressForm, undefined>,
    errors: FieldErrors<AddressForm>,
    control: Control<AddressForm, any>,
    setValue: UseFormSetValue<AddressForm>,
    smallScreenPickAddress: boolean,
    setSmallScreenPickAddress: Dispatch<SetStateAction<boolean>>;
    smallScreenFillAddressForm: boolean,
    setSmallScreenFillAddressForm: Dispatch<SetStateAction<boolean>>;
    isAddingAddress: boolean,
    setIsAddingAddress: Dispatch<SetStateAction<boolean>>;
}

const OnlineOrderContext = createContext<OnlineOrderContextType | undefined>(undefined);

export const useOnlineOrderContext = () => {
    const context = useContext(OnlineOrderContext);
    if (context === undefined) {
        throw new Error("useOnlineOrderContext must be used within a OnlineOrderProvider");
    }
    return context;
}

export type AddressForm = {
    type: string;
    name: string;
    street_address: string;
    place_id: string;
    city: string;
    state: string;
    landmark?: string;
    pin_code: number;
    phone_number: string;
    /* latitude: number;
    longitude: number; */
}

export const schema = z.object({
    type: z.string().min(3),
    name: z.string().min(3),
    street_address: z.string().min(3),
    place_id: z.string().min(3),
    city: z.string().min(3),
    state: z.string().min(3),
    landmark: z.string().nullish(),
    pin_code: z.number().min(6),
    phone_number: z.string().min(10),
    /* latitude: z.number().refine((data) => data, {
        message: "Your location is required"
    }),
    longitude: z.number().refine((data) => data, {
        message: "Your location is required"
    }) */
})

export const OnlineOrderProvider = ({ children }: { children: ReactNode }) => {
    const [dishesSelected, setDishesSelected] = useState<DishSelected[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [checkout, setCheckout] = useState<ICheckout>();
    const [startDate, setStartDate] = useState<Date>();
    const [paymentMode, setPaymentMode] = useState<PaymentMode>(PaymentMode.contact);

    const [showMap, setShowMap] = useState<boolean>(false);
    const [coordinates, setCoordinates] = useState<number[]>();
    const { register, reset, handleSubmit, formState: { errors }, control, setValue } = useForm<AddressForm>({ resolver: zodResolver(schema) });
    const [smallScreenPickAddress, setSmallScreenPickAddress] = useState<boolean>(false);
    const [smallScreenFillAddressForm, setSmallScreenFillAddressForm] = useState<boolean>(false);
    const [isAddingAddress, setIsAddingAddress] = useState<boolean>(false);

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
                setPaymentMode,
                showMap,
                setShowMap,
                coordinates,
                setCoordinates,
                register,
                reset,
                handleSubmit,
                errors,
                control,
                setValue,
                smallScreenPickAddress,
                setSmallScreenPickAddress,
                smallScreenFillAddressForm,
                setSmallScreenFillAddressForm,
                isAddingAddress,
                setIsAddingAddress
            }}
        >{children}</OnlineOrderContext.Provider>
    );
}