export interface CandidateExperienceDetailsRequestBody {
    experiences: Experience[];
}

export interface Experience {
    company: string;
    address: string;
    position: string;
    positionCode: string;
    startDate: Date;
    endDate: Date;
    salary: number;
}
