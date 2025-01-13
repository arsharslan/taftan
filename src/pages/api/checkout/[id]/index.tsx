import { NextApiRequest, NextApiResponse } from "next";
import { ResponseData } from "../../users";
import Address, { IAddress } from "@/models/address";
import connectDB from "@/lib/mongodb";
import Checkout, { ICheckout } from "@/models/checkout";
import { checkAuthorization } from "@/lib/check_authorization";
import { fetchDistance } from "@/provider/api_provider";
import Dessert, { IDish } from "@/models/dish";
import { DishSelected } from "@/app/online-order/[id]/page";
import User from "@/models/user";

export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout>) {
    try {
        await connectDB();

        const { id } = req.query;
        User;
        Dessert;
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

export const getPricing = (checkout: ICheckout) => {
    const sub_total = checkout.items?.map((e) => ((e.dish_id as IDish)?.price ?? 0) * (e.quantity ?? 0)).reduce((x, y) => x + y) ?? 0;
    const delivery_charges = checkout.delivery_charges ?? 0;
    const gst = (sub_total + delivery_charges) * 0.18;
    const total = sub_total + delivery_charges + gst;

    return {
        sub_total: +sub_total.toFixed(2),
        gst: +gst.toFixed(2),
        total: +total.toFixed(2)
    }
}

const getDeliveryAddress = async (address: number | undefined) => {
    if (!address) { return; }
    const addressDetail = await Address.findById(address);
    if (!addressDetail) { return; }
    const response = await fetchDistance({
        latitude: addressDetail.latitude,
        longitude: addressDetail.longitude
    });
    const distanceInMeters = response.data?.rows.at(0)?.elements.at(0)?.distance.value;
    if (!distanceInMeters) { return; }
    return (distanceInMeters / 1000) * 10; //I Know I could just divide by 100
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
            payment_mode
        } = req.body;

        let delivery_charges = await getDeliveryAddress(address);

        const newCheckout = await Checkout.findByIdAndUpdate(id, {
            ...(items && { items }),
            ...(user_id && { user_id }),
            ...(address && { address }),
            ...(requested_delivery_date && { requested_delivery_date }),
            ...(payment_done && { payment_done }),
            ...(payment_mode && { payment_mode }),
            ...(delivery_charges && { delivery_charges }),
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

export async function DELETE(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout>) {
    try {
        await connectDB();

        const { id } = req.query;
        User;
        Dessert;
        const checkout = await Checkout.findByIdAndDelete(id);
        console.log(checkout);
        res.status(204).json({});
        return;
        if (checkout) {
            res.status(204);
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout>) {
    /* const user = await checkAuthorization(req, res);
    if (!user) { return; } */
    const method = req.method;

    if (method === 'GET') {
        return GET(req, res);
    } else if (method === 'PATCH') {
        return PATCH(req, res);
    } else if (method === 'DELETE') {
        return DELETE(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'PATCH']);
        return res.status(405).json({
            success: false,
            message: `Method ${method} not allowed`,
        });
    }
}