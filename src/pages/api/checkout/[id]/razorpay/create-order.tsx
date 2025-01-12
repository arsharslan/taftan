import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '@/pages/api/users';
import { PaymentGatewayResponse } from '../create-order';
import User, { IUser } from '@/models/user';
import Dessert from '@/models/dish';
import Checkout from '@/models/checkout';
import { getPricing } from '..';
import { DishSelected } from '@/app/online-order/[id]/page';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID!,
    key_secret: process.env.RAZORPAY_SECRET,
});

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
        if (checkout?.total) {
            const user = checkout.user_id as IUser;
            var options = {
                amount: (checkout.total * 100).toFixed(0),
                currency: "INR",
            };
            const order = await razorpay.orders.create(options);
            res.status(200).json({
                payment_gateway: "RAZORPAY",
                data: order,
                user
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