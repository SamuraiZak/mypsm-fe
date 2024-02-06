export interface GetPersonalEducationResponse {
    status: string;
    data:   Data;
}

export interface Data {
    details: Details;
}

export interface Details {
    academicList: AcademicList[];
}

export interface AcademicList {
    id:             string;
    major:          string;
    minor:          string;
    country:        string;
    institution:    string;
    educationLevel: string;
    sponsorship:    string;
    name:           string;
    completionDate: Date;
    finalGrade:     string;
    remark:         null | string;
}
