"use server";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseData } from "./api/users";
import { verifyIdToken } from "@/pages/firebase_admin";

export const checkAuthorization = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authorization required"
        });
    }
    const user = await verifyIdToken(token);
    console.log(user);
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Authorization failed"
        });
    }

    return user;
}