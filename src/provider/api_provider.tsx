import firebase_app from "@/firebase/config";
import { IAddress } from "@/models/address";
import { ICheckout } from "@/models/checkout";
import { IDish } from "@/models/dish";
import { IUser } from "@/models/user";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

const auth = getAuth(firebase_app);

const getUser = new Promise<User | null>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        resolve(user);
    });
});


interface ErrorDictionary {
    [key: string]: string | string[];
}

export interface ApiResponse<T> {
    status: boolean;
    message: string;
    response?: any;
    data?: T;
    formatted_error?: string;
}



async function convertResponse<T>(
    response: Promise<Response>
): Promise<ApiResponse<T>> {
    try {
        const result = await response;
        if (result.ok) {
            const data: T = result?.status == 204 ? "" : await result.json();
            return {
                status: true,
                message: "Success",
                data: data,
            };
        } else {
            if (result.status == 401) {
                //   CookiesProvider.deleteToken();
            }
            const errors: ErrorDictionary = await result.json();
            console.log(errors)
            let formatted_error: string = errors["message"] as string;
            /* Object.keys(errors).map((key: string) => {
                console.log(key);
                console.log(errors[key]);
                if (errors[key] !== "success") {
                    
                }
                if (typeof errors[key] === "string") {
                    formatted_error += `${key.toUpperCase()}: ${errors[key]}\n`
                } else {
                    formatted_error += `${key.toUpperCase()}: ${(errors[key] as string[]).join(", ")}\n`
                }
            }); */
            console.log(formatted_error);

            return {
                status: false,
                response: errors,
                message: `Failed: ${result.status} ${result.statusText}`,
                formatted_error: formatted_error
            };
        }
    } catch (error) {
        return {
            status: false,
            message: `Error: ${error instanceof Error ? error.message : "An unknown error occurred"
                }`,
        };
    }
}

//----------------------Headers----------------------//
async function getHeaders(isImage = false) {
    const user = await getUser;
    const token = await user?.getIdToken();
    //   let token = CookiesProvider.getToken();
    /* if (token == null) {
        return {
            "Content-Type": "application/json",
            Accept: "application/json",
        } as HeadersInit;
    } else { */
    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: token }),
    } as HeadersInit;
    //   }
}
export async function findUser({ firebase_id }: { firebase_id: string }): Promise<ApiResponse<IUser>> {
    return convertResponse<IUser>(
        fetch(`/api/users/?firebase_id=${firebase_id}`, {
            headers: await getHeaders(),
        })
    );
}

export async function postUser({ user }: { user: IUser }): Promise<ApiResponse<IUser>> {
    return convertResponse<IUser>(
        fetch(`/api/users/`, {
            headers: await getHeaders(),
            method: "POST",
            body: JSON.stringify(user)
        })
    );
}

export async function fetchDishes(): Promise<ApiResponse<IDish[]>> {
    return convertResponse<IDish[]>(
        fetch(`/api/dishes/`, {
            headers: await getHeaders(),
        })
    );
}

export async function fetchAddresses({ user_id }: { user_id: string }): Promise<ApiResponse<IAddress[]>> {
    return convertResponse<IAddress[]>(
        fetch(`/api/address/?user_id=${user_id}`, {
            headers: await getHeaders(),
        })
    );
}

export async function postAddress({ address }: { address: IAddress }): Promise<ApiResponse<IAddress>> {
    return convertResponse<IAddress>(
        fetch(`/api/address/`, {
            method: "POST",
            body: JSON.stringify(address),
            headers: await getHeaders(),
        })
    );
}

export async function postCheckout({ checkout }: { checkout: ICheckout }): Promise<ApiResponse<ICheckout>> {
    return convertResponse<ICheckout>(
        fetch(`/api/checkout/`, {
            method: "POST",
            body: JSON.stringify(checkout),
            headers: await getHeaders(),
        })
    );
}

export async function fetchCheckout({ checkoutId }: { checkoutId: string }): Promise<ApiResponse<ICheckout>> {
    return convertResponse<ICheckout>(
        fetch(`/api/checkout/${checkoutId}`, {
            headers: await getHeaders(),
        })
    );
}

export async function fetchCheckouts({ user_id, payment_mode }: { user_id: string, payment_mode?: string }): Promise<ApiResponse<ICheckout[]>> {
    let url = `/api/checkout/?user_id=${user_id}&`;
    if (payment_mode) {
        url += `payment_mode=${payment_mode}&`;
    }

    return convertResponse<ICheckout[]>(
        fetch(url, {
            headers: await getHeaders(),
        })
    );
}

export async function fetchAdminCheckouts({ user_id, payment_mode }: { user_id?: string, payment_mode?: string }): Promise<ApiResponse<ICheckout[]>> {
    let url = `/api/admin/checkout/?`;
    if (user_id) {
        url += `user_id=${user_id}&`;
    }
    if (payment_mode) {
        url += `payment_mode=${payment_mode}&`;
    }

    return convertResponse<ICheckout[]>(
        fetch(url, {
            headers: await getHeaders(),
        })
    );
}

export async function patchCheckout({ checkout }: { checkout: ICheckout }): Promise<ApiResponse<ICheckout>> {
    return convertResponse<ICheckout>(
        fetch(`/api/checkout/${checkout._id}`, {
            method: "PATCH",
            body: JSON.stringify(checkout),
            headers: await getHeaders(),
        })
    );
}