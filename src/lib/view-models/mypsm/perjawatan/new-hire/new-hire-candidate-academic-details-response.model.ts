export interface CandidateAcademicDetailsResponse {
    status:  number;
    message: string;
    data:    AcademicResponseData;
}

export interface AcademicResponseData {
    academicList: AcademicList[];
    isReadonly:   boolean;
}

export interface AcademicList {
    id:               string;
    majorMinorId:     null;
    countryId:        string;
    institutionId:    string;
    educationLevelId: string;
    sponsorshipId:    string;
    name:             string;
    completionDate:   Date;
    finalGrade:       string;
    field:            string;
}
