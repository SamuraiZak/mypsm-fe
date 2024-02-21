export interface CandidateAcademiceDetailsRequestBody {
    academics: Academic[];
}

export interface Academic {
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
