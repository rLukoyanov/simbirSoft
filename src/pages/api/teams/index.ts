// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { apiClient } from "../apiClient";
import { ITeams } from "@/types";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { data } = await apiClient.get<ITeams>(`/teams/`);

    res.json(data);
}
