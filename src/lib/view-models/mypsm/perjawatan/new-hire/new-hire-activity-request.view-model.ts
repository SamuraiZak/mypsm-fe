export interface CandidateActivityRequestBody {
    activities: Activity[];
}

export interface Activity {
    name: string;
    joinDate: Date;
    position: string;
    description: string;
}
