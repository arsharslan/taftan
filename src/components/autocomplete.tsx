"use client";
import { Libraries, useJsApiLoader,  } from "@react-google-maps/api";
import { HTMLInputTypeAttribute, InputHTMLAttributes, useEffect, useRef } from "react";
import { UseFormRegisterReturn } from 'react-hook-form';

const libraries = ['places', 'drawing', 'geometry'];


export default function Autocomplete({
    onSelect,
    id,
    name,
    registerValue,
    className
}: {
    onSelect: (value: google.maps.places.PlaceResult | undefined) => void,
    id: string,
    name: string,
    registerValue: UseFormRegisterReturn,
    className?: string
}) {

    const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: libraries as Libraries,
    });
    let pinRef = useRef<HTMLInputElement | null>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete>();

    useEffect(() => {
        registerValue.ref(pinRef);

    }, [])

    useEffect(() => {
        if (autocompleteRef?.current || !pinRef.current || !window.google.maps.places) return;

        autocompleteRef.current = new google.maps.places.Autocomplete(
            pinRef.current,
            {
                types: ['postal_code'],
                componentRestrictions: { country: 'in' }
            }
        );

        if (autocompleteRef.current) {
            autocompleteRef.current.addListener(
                "place_changed",
                () => {
                    const place: google.maps.places.PlaceResult | undefined = autocompleteRef.current?.getPlace();
                    console.log(place);
                    const pin = place?.address_components?.filter((x) => x.types.includes("postal_code"))[0].long_name;
                    pinRef.current!.value! = pin ?? "";
                    onSelect(place);
                }
            );
        }
        
    }, [scriptLoaded]);

    return <input
        type="number"
        id={id}
        {...registerValue}
        name={name}
        className={className ?? "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
        ref={(e) => {
            registerValue.ref(e);
            pinRef.current = e
          }}
    />
}