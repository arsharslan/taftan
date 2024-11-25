import {deleteCookie, getCookie, setCookie} from "cookies-next";

export class CookiesProvider {

    static setUserId(token: any) {
        setCookie('user_id', token)
    }

    static async getUserId() {
        return (await getCookie('user_id'));
    }

    static deleteUserId() {
        deleteCookie('user_id');
    }
}