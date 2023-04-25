// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { apiClient } from "../apiClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.body.dateFrom && req.body.dateFrom) {
            const { data } = await apiClient.get(
                `/teams/${req.body.teamId}/matches?dateFrom=${req.body.dateFrom}&dateTo=${req.body.dateTo}`
            );
            res.json(data);
        } else {
            const data = await apiClient.get(
                `/teams/${req.body.teamId}/matches`
            );
            console.log(data);

            res.json(data);
        }
    } catch (e: any) {
        res.statusCode = e.response.status;
        res.json(e.response.data);
    }
}
