export interface CandidateAcademicDetailsResponse {
    status: number;
    message: string;
    data: AcademicResponseData;
}

export interface AcademicResponseData {
    academicList: AcademicList[];
    isReadonly: boolean;
}

export interface AcademicList {
    // id: number;
    majorId: number;
    minorId: number;
    countryId: number;
    institutionId: number;
    educationLevelId: number;
    sponsorshipId: number;
    name: string;
    completionDate: Date;
    finalGrade: string;
    field: string;
}
