export interface GetContractExperienceDetailDTO {
    experienceList: ExperienceList[];
    isReadonly:     boolean;
}

export interface ExperienceList {
    company:      string;
    address:      string;
    position:     string;
    positionCode: string;
    startDate:    Date;
    endDate:      Date;
    salary:       string;
}