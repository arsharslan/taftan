import connectDB from '@/lib/mongodb';
import clientPromise from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../users';
import Address, { IAddress } from '@/models/address';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Checkout, { ICheckout } from '@/models/checkout';

export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout[]>) {
    try {
        await connectDB();
        console.log(req.query);
        const checkouts = await Checkout.find({
            user_id: {
                $eq: req.query.user_id
            }
        });
        res.status(200).json(checkouts);
    } catch (error) {
        console.error('GET Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch checkouts' });
    }
}

export async function POST(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout>) {
    try {
        await connectDB()

        const {
            user_id,
            items,
            address,
            requested_delivery_date,
            payment_done
        } = req.body;

        // Validate input
        if (
            !user_id ||
            !items
        ) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        // Create a new user
        const newCheckout = new Checkout({
            user_id,
            items,
            address,
            requested_delivery_date,
            payment_done
        });

        await newCheckout.save();

        res.status(201).json(newCheckout);
    } catch (error) {
        console.error('POST Error:', error);
        res.status(500).json({ success: false, message: `Failed to create checkout ${error}` });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout[] | ICheckout>) {
    const method = req.method;

    if (method === 'GET') {
        return GET(req, res);
    } else if (method === 'POST') {
        return POST(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({
            success: false,
            message: `Method ${method} not allowed`,
        });
    }
}