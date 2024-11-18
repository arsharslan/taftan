"use client"
import Image from "next/image";
import { ConfirmationResult, getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FirebaseError } from "firebase/app";
import FieldErrorDisplay from "@/components/field_error";
import { findUser } from "@/provider/api_provider";
import { useRouter, useSearchParams } from "next/navigation";

const provider = new GoogleAuthProvider();

export default function SignInView() {
    const auth = getAuth(firebase_app);
    const [appVerifier, setAppVerifier] = useState<RecaptchaVerifier>();

    useEffect(() => {
        if (appVerifier == undefined) {
            setAppVerifier(
                new RecaptchaVerifier(auth, "recaptcha-container", {
                    size: "invisible",
                    callback: (response: any) => {
                    },
                })
            );
        }
    }, []);
    const [isVerifyingPhoneNumber, setIsVerifyingPhoneNumber] = useState<boolean>(false);
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult>();

    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const otpRef = useRef<HTMLInputElement>(null);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [isVerifyingGmail, setIsVerifyingGmail] = useState<boolean>(false);
    const searchParams = useSearchParams();


    const sendOTP = async () => {
        if (!phoneNumberRef.current?.value) { return; }
        setIsVerifyingPhoneNumber(true);
        getAuth();
        try {
            const result = await signInWithPhoneNumber(auth, `+91${phoneNumberRef.current?.value}`, appVerifier);
            setConfirmationResult(result);
        } catch (e) {
            console.log(e);
        }
        setIsVerifyingPhoneNumber(false);
    }

    const verifyOTP = async () => {
        if (!otpRef.current?.value) { return; }
        setIsVerifyingPhoneNumber(true);
        try {
            const user = await confirmationResult?.confirm(otpRef.current?.value);
            console.log(user);
        } catch (e) {

        }
        setIsVerifyingPhoneNumber(false);
    }

    const googleSignIn = async () => {
        const auth = getAuth();
        setIsVerifyingGmail(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            const response = await findUser({ firebase_id: user.uid });
            if (response.data) {
                router.push(searchParams?.get("redirect") ?? "/");
            } else {
                router.push(`/onboard?${searchParams?.get("redirect") ? `redirect=${searchParams?.get("redirect")}` : ""}`);
            }
        } catch (e) {
            console.log(e);
        }
        setIsVerifyingGmail(false);
    }

    const [isVerifyingEmail, setIsVerifyingEmail] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const router = useRouter();

    const signInUsingEmail = async () => {
        setError(undefined);
        if (!emailRef.current?.value || !passwordRef.current?.value) {
            if (!emailRef.current?.value) {
                setError("Please provide your email");
            } else if (!passwordRef.current?.value) {
                setError("Please provide your password")
            }
            return;
        }
        setIsVerifyingEmail(true);
        try {
            const result = await signInWithEmailAndPassword(auth, emailRef.current?.value, passwordRef.current?.value);
            const response = await findUser({ firebase_id: result.user.uid });
            if (response.data) {
                router.push(searchParams?.get("redirect") ?? "/");
            } else {
                router.push(`/onboard?${searchParams?.get("redirect") ? `redirect=${searchParams?.get("redirect")}` : ""}`);
            }
        } catch (error) {
            if (error instanceof FirebaseError) {
                // Handle Firebase-specific error
                setError(error.message);
            } else {
                // Handle other types of errors
                console.error('General Error:', error);
            }
        }
        setIsVerifyingEmail(false);
    }

    return <>
        <div id="recaptcha-container"></div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image src={"/images/taftan_logo_alt-modified.png"} alt={""} height={100} width={100} className="mx-auto" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">


                    {/* 
                    PHONE NUMBER
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                            Phone Number
                        </label>
                        <div className="mt-2">
                            <input
                                ref={phoneNumberRef}
                                required
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    {confirmationResult && <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                                OTP
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                ref={otpRef}
                                required
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>}

                    <div>
                        <button
                            onClick={confirmationResult ? verifyOTP : sendOTP}
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            {isVerifyingPhoneNumber ? "Please Wait" : confirmationResult ? "Verify" : "Send OTP"}
                        </button>
                    </div> */}

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                            Email Address
                        </label>
                        <div className="mt-2">
                            <input
                                ref={emailRef}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                ref={passwordRef}
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={signInUsingEmail}
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            {isVerifyingEmail ? "Please Wait" : "Sign in"}
                        </button>
                        {error && <FieldErrorDisplay error={error} />}
                    </div>


                    <button
                        onClick={googleSignIn}
                        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                            <path
                                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                fill="#EA4335"
                            />
                            <path
                                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                fill="#4285F4"
                            />
                            <path
                                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                fill="#34A853"
                            />
                        </svg>
                        <span className="text-sm/6 font-semibold">{isVerifyingGmail ? "Please Wait" : "Google"}</span>
                    </button>
                </div>
            </div>

            <p className="mt-10 text-center text-sm/6 text-gray-400">
                Not a member?{' '}
                <Link href="/sign-up" className="font-semibold text-indigo-400 hover:text-indigo-300">
                    Sign Up
                </Link>
            </p>
        </div>
    </>
}