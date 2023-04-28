export interface ITeams {
    teams: ITeam[];
    filters: { limit: number; offset: number; permission: string };
    count: number;
}

export interface ITeam {
    address: string;
    clubColors: string;
    crest: string;
    founded: number;
    id: number;
    lastUpdated: string;
    name: string;
    shortName: string;
    tla: string;
    venue: string;
    website: string;
}
