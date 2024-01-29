export interface GetPersonalAcademicResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    academicList: AcademicList[];
}

export interface AcademicList {
    id:             string;
    majorMinor:     string;
    country:        string;
    institution:    string;
    educationLevel: string;
    sponsorship:    string;
    name:           string;
    completionDate: Date;
    finalGrade:     string;
    field:          string;
}
