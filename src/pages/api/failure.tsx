import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method === 'POST' || method === 'GET') {
        const { txnid, status } = req.body;
        const { checkout_id } = req.query;

        // if (status === 'success') {
            res.redirect(`/failure?checkout_id=${checkout_id}`);
        // } else {
        //     res.redirect(`/failure?checkout_id=${checkout_id}`);
        // }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}