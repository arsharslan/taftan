import { NextApiRequest, NextApiResponse } from "next";
import { ResponseData } from "../users";
import Address, { IAddress } from "@/models/address";
import connectDB from "@/lib/mongodb";
import Checkout, { ICheckout } from "@/models/checkout";

export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout>) {
    try {
        await connectDB();

        const { id } = req.query;

        const checkout = await Checkout.findById(id);
        
        if (checkout) {
            res.status(200).json(checkout);
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout>) {
    const method = req.method;

    if (method === 'GET') {
        return GET(req, res);
    } else if (method === 'PATCH') {
        // return PATCH(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'PATCH']);
        return res.status(405).json({
            success: false,
            message: `Method ${method} not allowed`,
        });
    }
}