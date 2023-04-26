export interface ICompetitions {
    competitions: ICompetition[];
    count: number;
    filters: {
        client: string;
    };
}

export interface ICompetition {
    area: {
        code: string;
        flag: string;
        id: number;
        name: string;
    };
    code: string;
    currentSeason: {
        currentMatchday: number;
        endDate: string;
        id: number;
        startDate: string;
        winner: string | null;
    };
    emblem: string;
    id: number;
    lastUpdated: string;
    name: string;
    numberOfAvailableSeasons: number;
    plan: string;
    type: string;
}
