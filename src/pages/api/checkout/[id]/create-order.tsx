import { NextApiRequest, NextApiResponse } from "next";
import { ResponseData } from "../../users";
import Address, { IAddress } from "@/models/address";
import connectDB from "@/lib/mongodb";
import Checkout, { ICheckout } from "@/models/checkout";
import { checkAuthorization } from "@/lib/check_authorization";
import { fetchDistance } from "@/provider/api_provider";
import Dessert, { IDish } from "@/models/dish";
import { DishSelected } from "@/app/online-order/[id]/page";
import User, { IUser } from "@/models/user";
import { getPricing } from ".";
import Payu from "payu-websdk";
import { NextResponse } from "next/server";

// const Payu: any = require('payu-websdk');

const payu = new Payu({
    key: process.env.PAYU_KEY!,
    salt: process.env.PAYU_SALT!
},
    "TEST")

function generateRandomString(length = 10, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
    let result = '';
    const charLength = chars.length;
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}

export interface PaymentGatewayResponse {
    payment_gateway: string,
    data: any,
    new_checkout?: ICheckout
}

export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData | PaymentGatewayResponse>) {
    try {

        await connectDB();

        const { id } = req.query;
        User;
        Dessert;
        const checkout = await Checkout.findById(id).populate('items.dish_id').populate("user_id").lean();
        const pricing = getPricing(
            {
                _id: checkout?._id,
                items: checkout?.items?.map((e) => e as DishSelected),
                delivery_charges: checkout?.delivery_charges
            }
        );
        if (checkout) {
            checkout!.gst = pricing.gst;
            checkout!.sub_total = pricing.sub_total;
            checkout!.total = pricing.total;
        }
        if (checkout) {
            const user = checkout.user_id as IUser;
            const payload = {
                amount: checkout.total,
                txnid: generateRandomString(),
                productinfo: "food-order",
                firstname: user?.first_name,
                email: user.email,
                phone: user.phone_number,
                surl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/success?checkout_id=${id}`,
                furl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/failure?checkout_id=${id}`
            };
            console.log(payload)
            const payuResponse = await payu.paymentInitiate(payload);
            res.status(200).json({
                payment_gateway: "PAYU",
                data: payuResponse
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Checkout not found"
            });
        }
    } catch (error) {
        console.error('GET Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch checkout' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | PaymentGatewayResponse>) {
    /* const user = await checkAuthorization(req, res);
            if (!user) { return; } */
    const method = req.method;

    if (method === 'GET') {
        return GET(req, res);
    } /* else if (method === 'PATCH') {
        return PATCH(req, res);
    } else */ {
        res.setHeader('Allow', ['GET', 'PATCH']);
        return res.status(405).json({
            success: false,
            message: `Method ${method} not allowed`,
        });
    }
}