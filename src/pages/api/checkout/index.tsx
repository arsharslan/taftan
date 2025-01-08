import connectDB from '@/lib/mongodb';
import clientPromise from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../users';
import Address, { IAddress } from '@/models/address';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Checkout, { ICheckout } from '@/models/checkout';
import { checkAuthorization } from '@/lib/check_authorization';
import Dessert from '@/models/dish';
import { getPricing } from './[id]';

export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout[]>) {
    try {
        await connectDB();
        console.log(req.query);
        Dessert;
        const checkouts = await Checkout.find({
            user_id: {
                $eq: req.query.user_id
            },
            ...(req.query.payment_mode && {
                payment_mode: {
                    $eq: req.query.payment_mode
                }
            })
        }).sort([["createdAt", -1]]).populate('items.dish_id');
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
            // !user_id ||
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

        const checkoutCreated = await newCheckout.save();
        //adding pricing is not working
        const pricing = getPricing(newCheckout);
        if (newCheckout) {
            newCheckout!.gst = pricing.gst;
            newCheckout!.sub_total = pricing.sub_total;
            newCheckout!.total = pricing.total;
        }
        console.log(newCheckout);

        res.status(201).json(newCheckout);
    } catch (error) {
        console.error('POST Error:', error);
        res.status(500).json({ success: false, message: `Failed to create checkout ${error}` });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout[] | ICheckout>) {
    /*     const user = await checkAuthorization(req, res);
        if (!user) { return; } */
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