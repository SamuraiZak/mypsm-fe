// ======================================================
// SHARED
// ======================================================
export interface RetirementEndorsementDTO {
    forceId: number;
    status:      boolean;
    remark:      string;
}

// detail request DTO
export interface RetirementForcedApplicationDetailRequestDTO{
    forceId?:       number;
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