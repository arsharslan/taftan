import connectDB from '@/lib/mongodb';
import clientPromise from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import Address, { IAddress } from '@/models/address';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Checkout, { ICheckout } from '@/models/checkout';
import { checkAuthorization } from '@/lib/check_authorization';
import Dessert from '@/models/dish';
import { ResponseData } from '../../users';
import User from '@/models/user';

export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout[]>) {
    try {
        await connectDB();
        User;
        Dessert;
        const checkouts = await Checkout.find({
            ...(req.query.user_id && {
                user_id: {
                    $eq: req.query.user_id
                }
            }),
            ...(req.query.payment_mode && {
                payment_mode: {
                    $eq: req.query.payment_mode
                }
            }),
            ...(req.query.is_paid !== undefined && {
                is_paid: {
                    $eq: req.query.is_paid
                }
            })
        }).populate('items.dish_id').populate('user_id').sort([["createdAt", -1]]);
        res.status(200).json(checkouts);
    } catch (error) {
        console.error('GET Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch checkouts' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | ICheckout[] | ICheckout>) {
    const user = await checkAuthorization(req, res);
    if (!user) { return; }
    const method = req.method;

    if (method === 'GET') {
        return GET(req, res);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({
            success: false,
            message: `Method ${method} not allowed`,
        });
    }
}