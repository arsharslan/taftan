import connectDB from '@/lib/mongodb';
import clientPromise from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../users';
import Address, { IAddress } from '@/models/address';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { checkAuthorization } from '@/pages/check_authorization';

export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData | IAddress[]>) {
    try {
        await connectDB();
        console.log(req.query);
        const addresses = await Address.find({
            user_id: {
                $eq: req.query.user_id
            }
        });
        res.status(200).json(addresses);
    } catch (error) {
        console.error('GET Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch addresses' });
    }
}

export async function POST(req: NextApiRequest, res: NextApiResponse<ResponseData | IAddress>) {
    try {
        await connectDB()

        const {
            user_id,
            name,
            street_address,
            city,
            state,
            landmark,
            pin_code,
            phone_number,
        } = req.body;

        // Validate input
        if (
            !user_id ||
            !name ||
            !street_address ||
            !city ||
            !state ||
            !pin_code ||
            !phone_number
        ) {
            return res.status(400).json({ success: false, message: "Missing fields" });
        }

        // Create a new user
        const newAddress = new Address({
            user_id,
            name,
            street_address,
            city,
            state,
            landmark,
            pin_code,
            phone_number,
        });

        await newAddress.save();

        res.status(201).json(newAddress);
    } catch (error) {
        console.error('POST Error:', error);
        res.status(500).json({ success: false, message: `Failed to create address ${error}` });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | IAddress[] | IAddress>) {
    const user = await checkAuthorization(req, res);
    if (!user) { return; }
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
