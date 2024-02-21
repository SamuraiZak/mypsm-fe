export interface ExperienceResponseData {
    experienceList: ExperienceList[];
    isReadonly: boolean;
}

export interface ExperienceList {
    company: string;
    address: string;
    position: string;
    positionCode: string;
    startDate: Date;
    endDate: Date;
    salary: number;
}
