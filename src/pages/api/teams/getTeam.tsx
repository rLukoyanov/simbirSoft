// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { apiClient } from "../apiClient";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.body.dateFrom && req.body.dateFrom) {
        const { data } = await apiClient.get(
            `/teams/${req.body.teamId}/matches?dateFrom=${req.body.dateFrom}&dateTo=${req.body.dateTo}`
        );
        res.json(data);
    } else {
        const { data, status } = await apiClient.get(
            `/teams/${req.body.teamId}/matches`
        );

        res.statusCode = status;
        res.json(data);
    }
}
