import { ResponseData } from "@/pages/api/users";
import { NextApiRequest, NextApiResponse } from "next";
import { PaymentGatewayResponse } from "../create-order";
import crypto from 'crypto';
import User from "@/models/user";
import Dessert from "@/models/dish";
import Checkout, { ICheckout } from "@/models/checkout";


const generatedSignature = (
    razorpayOrderId: string,
    razorpayPaymentId: string
) => {
    const keySecret = process.env.RAZORPAY_SECRET;
    if (!keySecret) {
        throw new Error(
            'Razorpay key secret is not defined in environment variables.'
        );
    }
    const sig = crypto
        .createHmac('sha256', keySecret)
        .update(razorpayOrderId + '|' + razorpayPaymentId)
        .digest('hex');
    return sig;
};

export async function POST(req: NextApiRequest, res: NextApiResponse<ResponseData | PaymentGatewayResponse>) {
    const { order_creation_id, razorpay_payment_id, razorpay_signature } = req.body;

    const signature = generatedSignature(order_creation_id, razorpay_payment_id);
    if (signature !== razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: "Payment Not Verified"
        });

    }
    const { id, transaction_id } = req.query;
    User;
    Dessert;

    const updatedCheckout = await Checkout.findByIdAndUpdate(id, {
        is_paid: true
    }, { new: true });

    return res.status(200).json({
        payment_gateway: "RAZORPAY",
        new_checkout: updatedCheckout as ICheckout
    });

}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | PaymentGatewayResponse>) {
    /* const user = await checkAuthorization(req, res);
            if (!user) { return; } */
    const method = req.method;

    if (method === 'POST') {
        return POST(req, res);
    } {
        res.setHeader('Allow', ['GET', 'PATCH']);
        return res.status(405).json({
            success: false,
            message: `Method ${method} not allowed`,
        });
    }
}