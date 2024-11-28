import { NextApiRequest, NextApiResponse } from "next";
import { ResponseData } from "./users";
import connectDB from "@/lib/mongodb";
import Dessert, { IDish } from "@/models/dish";
import { checkAuthorization } from "../check_authorization";

export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData | IDish[]>) {
    try {
        await connectDB()
        // Fetch all users
        const dishes = await Dessert.find();
        if (dishes.length > 0) {
            res.status(200).json(dishes);
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
        // const users = await User.findById("6738f6cb143d28d3730b12f7")
    } catch (error) {
        console.error('GET Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | IDish[]>) {
    const user = await checkAuthorization(req, res);
    if (!user) { return; }

    const method = req.method;

    if (method === 'GET') {
        return GET(req, res);
    } else if (method === 'POST') {
        // return POST(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({
            success: false,
            message: `Method ${method} not allowed`,
        });
    }
}