import { IAddress } from "@/models/address";
import { ICheckout } from "@/models/checkout";
import { IDish } from "@/models/dish";
import { IUser } from "@/models/user";

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
function getHeaders(isImage = false) {
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
        //   Authorization: `${token}`,
    } as HeadersInit;
    //   }
}
export async function findUser({ firebase_id }: { firebase_id: string }): Promise<ApiResponse<IUser>> {
    return convertResponse<IUser>(
        fetch(`/api/users/?firebase_id=${firebase_id}`, {
            headers: getHeaders(),
        })
    );
}

export async function postUser({ user }: { user: IUser }): Promise<ApiResponse<IUser>> {
    return convertResponse<IUser>(
        fetch(`/api/users/`, {
            headers: getHeaders(),
            method: "POST",
            body: JSON.stringify(user)
        })
    );
}

export async function fetchDishes(): Promise<ApiResponse<IDish[]>> {
    return convertResponse<IDish[]>(
        fetch(`/api/dishes/`, {
            headers: getHeaders(),
        })
    );
}

export async function fetchAddresses({ user_id }: { user_id: string }): Promise<ApiResponse<IAddress[]>> {
    return convertResponse<IAddress[]>(
        fetch(`/api/address/?user_id=${user_id}`, {
            headers: getHeaders(),
        })
    );
}

export async function postAddress({ address }: { address: IAddress }): Promise<ApiResponse<IAddress>> {
    return convertResponse<IAddress>(
        fetch(`/api/address/`, {
            method: "POST",
            body: JSON.stringify(address),
            headers: getHeaders(),
        })
    );
}

export async function postCheckout({ checkout }: { checkout: ICheckout }): Promise<ApiResponse<ICheckout>> {
    return convertResponse<ICheckout>(
        fetch(`/api/checkout/`, {
            method: "POST",
            body: JSON.stringify(checkout),
            headers: getHeaders(),
        })
    );
}

export async function fetchCheckout({ checkoutId }: { checkoutId: string }): Promise<ApiResponse<ICheckout>> {
    return convertResponse<ICheckout>(
        fetch(`/api/checkout/${checkoutId}`, {
            headers: getHeaders(),
        })
    );
}