export interface CandidateExperienceDetailsResponse {
    status: number;
    message: string;
    data: ExperienceResponseData;
}

export interface ExperienceResponseData {
    experienceList: ExperienceList[];
    isReadonly: boolean;
}

export interface ExperienceList {
    company: string;
    address: string;
    position: null;
    positionCode: string;
    startDate: Date;
    endDate: Date;
    salary: string;
}
