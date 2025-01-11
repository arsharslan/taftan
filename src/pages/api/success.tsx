import { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/navigation";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method === 'POST' || method === 'GET') {
        const { txnid, status } = req.body;
        const { checkout_id } = req.query;

        console.log("testt")
        res.redirect(301, `/success?checkout_id=${checkout_id}&txnid=${txnid}`).end();

        // if (status === 'success') {

        // } else {
        //     res.redirect(`/failure?checkout_id=${checkout_id}`);
        // }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}