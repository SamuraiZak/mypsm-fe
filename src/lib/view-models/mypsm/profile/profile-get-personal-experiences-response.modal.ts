export interface GetPersonalExperiencesResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    experienceList: ExperienceList[];
}

export interface ExperienceList {
    id:           string;
    company:      string;
    address:      string;
    position:     string;
    positionCode: string;
    startDate:    Date;
    endDate:      Date;
    salary:       number;
}
