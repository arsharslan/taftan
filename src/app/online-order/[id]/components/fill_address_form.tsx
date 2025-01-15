import { Controller } from "react-hook-form";
import { useOnlineOrderContext } from "../online_order_context";
import { generateUniqSerial } from "@/utils/unique";
import FieldErrorDisplay from "@/components/field_error";
import { useMediaQuery } from "react-responsive";
import LoadingIndicator from "@/components/loading_indicator";
import { SleekButton } from "@/components/custom_button";

export default function FillAddressForm() {
    const { checkout, setCheckout, setCurrentStep, showMap,
        setShowMap,
        coordinates,
        setCoordinates,
        register,
        reset,
        handleSubmit,
        errors,
        control,
        setValue,
        isAddingAddress,
        setIsAddingAddress
    } = useOnlineOrderContext();

    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

    return <>
        <div>
            <div className="my-2">
                <div className="flex flex-col justify-between">
                    <dt className="text-left block text-sm/6 font-medium ">Save Address as</dt>
                    <Controller
                        name={"type"}
                        control={control}
                        render={(field) => {
                            return <>
                                <dd className="space-x-2">
                                    {[
                                        "Home",
                                        "Work",
                                        "Hostel",
                                        "Other"
                                    ].map((e, index) => {
                                        return <span
                                            key={generateUniqSerial()}
                                            onClick={() => {
                                                field.field.onChange(e);
                                            }}
                                            className={field.field.value === e ? `hover:cursor-pointer inline-flex items-center rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-green-600/20` : `hover:cursor-pointer inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10`}>
                                            {e}
                                        </span>
                                    })}
                                </dd>
                            </>
                        }} />

                </div>
                {errors.name?.message && <FieldErrorDisplay error={errors.name?.message} className="flex" />}
            </div>
        </div>
        <div>
            <label htmlFor="email" className="text-left block text-sm/6 font-medium ">
                Name
            </label>
            <div className="mt-2">
                <input
                    {...register("name", { required: true })}
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full bg-transparent rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                {errors.name?.message && <FieldErrorDisplay error={errors.name?.message} className="flex" />}
            </div>
        </div>
        <div>
            <label htmlFor="email" className="text-left block text-sm/6 font-medium">
                City
            </label>
            <div className="mt-2">
                <input
                    {...register("city", { required: true })}
                    id="city"
                    name="city"
                    type="text"
                    className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                {errors.city?.message && <FieldErrorDisplay error={errors.city?.message} className="flex" />}
            </div>
        </div>
        <div>
            <label htmlFor="email" className="text-left block text-sm/6 font-medium">
                State
            </label>
            <div className="mt-2">
                <input
                    {...register("state", { required: true })}
                    id="state"
                    name="state"
                    type="text"
                    className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                {errors.state?.message && <FieldErrorDisplay error={errors.state?.message} className="flex" />}
            </div>
        </div>
        <div>
            <label htmlFor="email" className="text-left block text-sm/6 font-medium">
                Landmark
            </label>
            <div className="mt-2">
                <input
                    {...register("landmark")}
                    id="landmark"
                    name="landmark"
                    type="text"
                    className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                {errors.landmark?.message && <FieldErrorDisplay error={errors.landmark?.message} className="flex" />}
            </div>
        </div>
        <div>
            <label htmlFor="email" className="text-left block text-sm/6 font-medium">
                Pin Code
            </label>
            <div className="mt-2">
                <input
                    {...register("pin_code", { required: true, valueAsNumber: true })}
                    id="pin_code"
                    name="pin_code"
                    type="text"
                    className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                {errors.pin_code?.message && <FieldErrorDisplay error={errors.pin_code?.message} className="flex" />}
            </div>
        </div>
        <div>
            <label htmlFor="email" className="text-left block text-sm/6 font-medium">
                Phone Number
            </label>
            <div className="mt-2">
                <input
                    {...register("phone_number", { required: true })}
                    id="phone_number"
                    name="phone_number"
                    type="text"
                    className="block w-full bg-transparent rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-golden placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
                {errors.phone_number?.message && <FieldErrorDisplay error={errors.phone_number?.message} className="flex" />}
            </div>
        </div>

        {isSmallScreen && <div>
            <button
                type="submit"
                className="mt-8 inline-flex w-full justify-center rounded-md bg-golden ring-golden ring-2 text-black hover:text-white px-3 py-2 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  sm:col-start-2"
            >
                {isAddingAddress ? <LoadingIndicator /> : "Save"}
            </button>
        </div>}
    </>
}