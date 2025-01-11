import { NextApiRequest, NextApiResponse } from "next";
import { ResponseData } from "../../../users";
import Address, { IAddress } from "@/models/address";
import connectDB from "@/lib/mongodb";
import Checkout, { ICheckout } from "@/models/checkout";
import { checkAuthorization } from "@/lib/check_authorization";
import { fetchDistance } from "@/provider/api_provider";
import Dessert, { IDish } from "@/models/dish";
import { DishSelected } from "@/app/online-order/[id]/page";
import User, { IUser } from "@/models/user";
import { getPricing } from "..";
import Payu from "payu-websdk";
import { NextResponse } from "next/server";
import { PaymentGatewayResponse } from "../create-order";

// const Payu: any = require('payu-websdk');

const payu = new Payu({
    key: process.env.PAYU_KEY!,
    salt: process.env.PAYU_SALT!
},
    "TEST")

export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData | PaymentGatewayResponse>) {
    try {

        await connectDB();

        const { id, transaction_id } = req.query;
        User;
        Dessert;
        if (typeof transaction_id === "string") {
            const payuResponse = await payu.verifyPayment(transaction_id);
            console.log(payuResponse)
            let updatedCheckout;
            if (payuResponse?.status === 1) {
                updatedCheckout = await Checkout.findByIdAndUpdate(id, {
                    is_paid: true
                }, { new: true });
            }
            res.status(200).json({
                payment_gateway: "PAYU",
                data: payuResponse,
                new_checkout: updatedCheckout as ICheckout
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