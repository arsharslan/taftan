import { NextApiRequest, NextApiResponse } from "next";
import { ResponseData } from "../users";
import Address, { IAddress } from "@/models/address";
import connectDB from "@/lib/mongodb";
import { checkAuthorization } from "@/lib/check_authorization";

export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData | IAddress>) {
    try {
        await connectDB();

        const { id } = req.query;

        const address = await Address.findById(id);
        if (address) {
            res.status(200).json(address);
        } else {
            res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }
    } catch (error) {
        console.error('GET Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch address' });
    }
}

export async function PATCH(req: NextApiRequest, res: NextApiResponse<ResponseData | IAddress>) {
    try {
        await connectDB();

        const { id } = req.query;

        const {
            user_id,
            name,
            street_address,
            city,
            state,
            landmark,
            pin_code,
            phone_number,
            latitude,
            longitude
        } = req.body;

        // Validate input
        if (
            !user_id ||
            !name ||
            !street_address ||
            !city ||
            !state ||
            !pin_code ||
            !phone_number ||
            !latitude ||
            !longitude
        ) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        // Create a new user
        const address = new Address({
            user_id,
            name,
            street_address,
            city,
            state,
            landmark,
            pin_code,
            phone_number,
            latitude,
            longitude
        });

        const updatedAddress = await Address.findByIdAndUpdate(id, address);

        if (updatedAddress) {
            res.status(200).json(updatedAddress);
        } else {
            res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

    } catch (error) {
        console.error('POST Error:', error);
        res.status(500).json({ success: false, message: `Failed to update address ${error}` });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | IAddress>) {
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