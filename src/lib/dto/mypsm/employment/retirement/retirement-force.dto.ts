// ======================================================
// SHARED
// ======================================================
export interface RetirementEndorsementDTO {
    forcedId: number;
    status:      boolean;
    remark:      string;
}

// detail request DTO
export interface RetirementForcedApplicationDetailRequestDTO{
    forcedId?:       number;
}

// ======================================================
// FORCED
// ======================================================
export interface RetirementForcedApplicationDetail{
    certificationDetail: RetirementEndorsementDTO | null;
    confirmationDetail: RetirementEndorsementDTO | null;
    document: RetirementEndorsementDTO | null;
    letterCertificationDetail: RetirementEndorsementDTO | null;
}