import connectDB from '@/lib/mongodb';
import clientPromise from '@/lib/mongodb';
import User from '@/models/user';
import type { NextApiRequest, NextApiResponse } from 'next';
import { checkAuthorization } from '../../lib/check_authorization';


export type ResponseData = {
    success?: boolean;
    data?: any;
    message?: string;
};

export async function GET(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {
        await connectDB()
        // Fetch all users
        const users = await User.find({
            firebase_id: {
                $eq: req.query.firebase_id
            }
        });
        if (users.length > 0) {
            res.status(200).json(users[0]);
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
        // const users = await User.findById("6738f6cb143d28d3730b12f7")
    } catch (error) {
        console.error('GET Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
}

export async function POST(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    try {
        await connectDB()

        const { firebase_id, first_name, last_name, profile_pic, phone_number, email } = req.body;

        // Validate input
        /* if (!name || !email) {
            return res.status(400).json({ success: false, message: 'Name and email are required' });
        } */

        // Create a new user
        const newUser = new User({ firebase_id, first_name, last_name, profile_pic, phone_number, email });
        const user = await User.findOne({
            firebase_id: {
                $eq: firebase_id
            }
        });
        console.log(user);
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists." })
        }
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error('POST Error:', error);
        res.status(500).json({ success: false, message: `Failed to create user ${error}` });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const method = req.method;
    if (method === 'POST') {
        return POST(req, res);
    }

    const user = await checkAuthorization(req, res);
    if (!user) { return; }

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
