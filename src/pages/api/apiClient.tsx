import axios from "axios";

export const apiClient = axios.create({
    baseURL: `https://api.football-data.org/v4`,
    headers: {
        "X-Auth-Token": process.env.API_TOKEN,
        "content-type": "application/json",
    },
});
