export interface CandidateAcademiceDetailsRequestBody {
    academics: Academic[];
}

export interface Academic {
    majorMinorId: number;
    countryId: number;
    institutionId: number;
    educationLevelId: number;
    sponsorshipId: number;
    name: string;
    completionDate: Date;
    finalGrade: string;
    field: string;
}
