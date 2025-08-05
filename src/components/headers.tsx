'use client'

import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Image from "next/image";
import { CookiesProvider } from '@/provider/cookies_provider'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import firebase_app from '@/firebase/config'
import LoadingIndicator from './loading_indicator'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [userId, setUserId] = useState<string>();
    const [isLoaggingOut, setIsLoggingOut] = useState<boolean>(false);
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        setListener();
        getUser();
    }, []);

    const setListener = () => {
        const auth = getAuth(firebase_app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setTimeout(() => {
                getUser();
            }, 2000);
        });
    }

    const getUser = async () => {
        const userId = await CookiesProvider.getUserId();
        setUserId(userId);
    }

    const logOut = async () => {
        setIsLoggingOut(true);
        if (!userId) {
            router.push("/sign-in");
            return;
        }
        const auth = getAuth(firebase_app);
        await signOut(auth);
        CookiesProvider.deleteUserId();
        router.push("/sign-in");
        setIsLoggingOut(false);
    }

    return (
        <header className="sticky top-0 z-50 text-gray-300 bg-dark-overlay">
            {/* Mobile Header */}
            <nav className="flex items-center justify-between p-4 lg:hidden">
                {/* Hamburger menu */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="inline-flex items-center justify-center rounded-md p-2.5"
                >
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
                {/* Logo and tagline */}
                <div className="flex flex-col items-center flex-1">
                    <Image src="/images/taftan_logo_3.png" alt="Taftan Logo" height={128} width={128} className="mx-auto" />
                </div>
                {/* Search icon */}
                <button className="inline-flex items-center justify-center rounded-md p-2.5">
                    <span className="sr-only">Search</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                    </svg>
                </button>
            </nav>
            {/* Desktop Header (unchanged) */}
            <nav aria-label="Global" className="mx-auto max-w-7xl items-center justify-between p-6 lg:flex hidden lg:px-8">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <Image src={"/images/taftan_logo_2.png"} alt={""} height={128} width={128} className="mx-auto" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Link href="/" className="text-sm/6 font-semibold ">
                        Home
                    </Link>
                    <Link href="/online-order/0" className={`text-sm/6 font-semibold ${path?.includes("online-order") ? "text-foreground-color" : ""}`}>
                        Menus
                    </Link>
                    <Link href="/#about" className="text-sm/6 font-semibold ">
                        About Us
                    </Link>
                    <Link href="#" className="text-sm/6 font-semibold ">
                        Contact
                    </Link>
                    {/* <Link href="#" className="text-sm/6 font-semibold ">
                        Our Chefs
                    </Link> */}
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <button className="text-sm/6 font-semibold "
                        onClick={logOut}
                    // disabled={!userId}
                    >
                        {isLoaggingOut ? <LoadingIndicator /> : userId ? "Log Out" : "Log in"} <span aria-hidden="true">&rarr;</span>
                    </button>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black text-gray-300 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <Image src={"/images/taftan_new_logo.png"} alt={""} height={64} width={64} className="mx-auto" />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 "
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {/* <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold  hover:bg-gray-50">
                                        Product
                                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-[open]:rotate-180" />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        { {[...products, ...callsToAction].map((item) => (
                                            <DisclosureButton
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </DisclosureButton>
                                        ))} }
                                    </DisclosurePanel>
                                </Disclosure> */}
                                <Link href="/" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold  hover:bg-gray-800">
                                    Home
                                </Link>
                                <Link href="/#menu" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold  hover:bg-gray-800">
                                    Menus
                                </Link>
                                <Link href="/#about" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold  hover:bg-gray-800">
                                    About Us
                                </Link>
                                <Link href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold  hover:bg-gray-800">
                                    Contact
                                </Link>
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold  hover:bg-gray-800"
                                >
                                    {isLoaggingOut ? <LoadingIndicator /> : "Log in"}
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
};

export default Header;