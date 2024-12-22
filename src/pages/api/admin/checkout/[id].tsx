import { NextApiRequest, NextApiResponse } from "next";
import Address, { IAddress } from "@/models/address";
import connectDB from "@/lib/mongodb";
import Checkout, { ICheckout } from "@/models/checkout";
import { checkAuthorization } from "@/lib/check_authorization";
import { ResponseData } from "../../users";
import { getPricing } from "../../checkout/[id]";
import { DishSelected } from "@/app/online-order/[id]/page";

export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout>) {
    try {
        await connectDB();

        const { id } = req.query;

        const checkout = await Checkout.findById(id).populate('items.dish_id').lean();
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
            res.status(200).json(checkout as ICheckout);
        } else {
            res.status(404).json({
                success: false,
                message: "Checkour not found"
            });
        }
    } catch (error) {
        console.error('GET Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch checkout' });
    }
}

export async function PATCH(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout>) {
    try {
        await connectDB()

        const { id } = req.query;

        const {
            user_id,
            items,
            address,
            requested_delivery_date,
            payment_done,
            payment_mode,
            is_paid
        } = req.body;

        // Validate input
        /* if (
            !user_id ||
            !items
        ) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        } */

        // Create a new user
        /* const newCheckout = new Checkout({
            user_id,
            items,
            address,
            requested_delivery_date,
            payment_done
        }); */

        const newCheckout = await Checkout.findByIdAndUpdate(id, {
            ...(items && { items }),
            ...(address && { address }),
            ...(requested_delivery_date && { requested_delivery_date }),
            ...(payment_done && { payment_done }),
            ...(payment_mode && { payment_mode }),
            ...(is_paid && { is_paid })
        }, { new: true }).populate('items.dish_id').lean();

        const pricing = getPricing(
            {
                _id: newCheckout?._id,
                items: newCheckout?.items?.map((e) => e as DishSelected),
                delivery_charges: newCheckout?.delivery_charges
            }
        );
        if (newCheckout) {
            newCheckout!.gst = pricing.gst;
            newCheckout!.sub_total = pricing.sub_total;
            newCheckout!.total = pricing.total;
        }

        if (newCheckout) {
            res.status(200).json(newCheckout as ICheckout);
        } else {
            res.status(400).json({
                success: false,
                message: "Failed to update checkout"
            });
        }
    } catch (error) {
        console.error('POST Error:', error);
        res.status(500).json({ success: false, message: `Failed to create checkout ${error}` });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout>) {
    const user = await checkAuthorization(req, res);
    if (!user) { return; }
    const method = req.method;

    if (method === 'GET') {
        return GET(req, res);
    } else if (method === 'PATCH') {
        return PATCH(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'PATCH']);
        return res.status(405).json({
            success: false,
            message: `Method ${method} not allowed`,
        });
    }
}