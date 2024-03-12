export interface GetContractAcademicDetailDTO {
    academicList: AcademicList[];
}

export interface AcademicList {
    id?:               number;
    majorId:          number;
    minorId:          number;
    countryId:        number;
    institutionId:    number;
    educationLevelId: number;
    sponsorshipId:    number;
    name:             string;
    completionDate:   Date;
    finalGrade:       string;
    field:            string;
}
