"use client";
import FieldErrorDisplay from "@/components/field_error";
import firebase_app from "@/firebase/config";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Image from "next/image";
import { useRef, useState } from "react";

export default function SignUpView() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const createUser = async () => {
        setError(undefined);
        if (!emailRef.current?.value || !passwordRef.current?.value || passwordRef.current.value.length < 6) {
            if (!emailRef.current?.value) {
                setError("Please provide your Email");
            } else if (!passwordRef.current?.value) {
                setError("Please provide a password");
            } else if (passwordRef.current.value.length < 6) {
                setError("Password must be atleat 6 characters long");
            }
            return;
        }
        setIsCreatingUser(true);
        const auth = getAuth(firebase_app);
        try {
            const result = await createUserWithEmailAndPassword(auth, emailRef.current?.value, passwordRef.current?.value);
        } catch (error) {
            if (error instanceof FirebaseError) {
                // Handle Firebase-specific error
                setError(error.message);
            } else {
                // Handle other types of errors
                console.error('General Error:', error);
            }
        }
        setIsCreatingUser(false);
    }

    return <>
        <div id="recaptcha-container"></div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image src={"/images/taftan_logo_alt-modified.png"} alt={""} height={100} width={100} className="mx-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign up</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                ref={emailRef}
                                required
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                ref={passwordRef}
                                type="password"
                                required
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={createUser}
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            {isCreatingUser ? "Please Wait" : "Sign Up"}
                        </button>
                        {error && <FieldErrorDisplay error={error} />}
                    </div>


                </div>
            </div>


        </div>
    </>;
}