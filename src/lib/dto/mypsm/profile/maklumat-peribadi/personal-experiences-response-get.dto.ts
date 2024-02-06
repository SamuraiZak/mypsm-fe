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
    position:     string;
    positionCode: null;
    address:      string;
    duration:     number;
    salary:       number;
}
