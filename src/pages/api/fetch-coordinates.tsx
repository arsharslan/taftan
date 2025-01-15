import connectDB from '@/lib/mongodb';
import clientPromise from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import Address, { IAddress } from '@/models/address';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import Checkout, { ICheckout } from '@/models/checkout';
import { checkAuthorization } from '@/lib/check_authorization';
import Dessert from '@/models/dish';
import { ResponseData } from './users';


export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData | GeocodeResponse>) {
    try {
        const { address } = req.query;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address as string)}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        res.status(200).json(data);
    } catch (error) {
        console.error('GET Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch checkouts' });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | GeocodeResponse>) {
    /*     const user = await checkAuthorization(req, res);
        if (!user) { return; } */
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