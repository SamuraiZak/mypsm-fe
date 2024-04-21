// ======================================================
// SHARED
// ======================================================
export interface RetirementEndorsementDTO {
    voluntaryId: number;
    status:      boolean;
    remark:      string;
}

export interface RetirementEndorserDetail {
    voluntaryId: number;
    supporter1:  string;
    supporter2:  string;
    approver:    string;
    isReadOnly:  boolean;
}

// ======================================================
// VOLUNTARY
// ======================================================
// detail
export interface RetirementVoluntaryDetailDTO {
    voluntaryId?:       number;
    retirementDate:    string;
    newRetirementDate: string;
    reason:            string;
}

export interface RetirementOriginalDetailDTO{
    retirementDatee: string;
}

// detail request DTO
export interface RetirementVoluntaryApplicationDetailRequestDTO{
    voluntaryId?:       number;
}

export interface RetirementVoluntaryApplicationDetail{
    applicationDetail: RetirementVoluntaryDetailDTO | null;
    certification: RetirementEndorsementDTO | null;
    confirmation: RetirementEndorsementDTO | null;
    supportApprover: RetirementEndorserDetail | null;
    firstSupporter: RetirementEndorsementDTO | null;
    secondSupporter: RetirementEndorsementDTO | null;
    approval: RetirementEndorsementDTO | null;
    secretaryApproval: RetirementEndorsementDTO | null;
    documentCertification: RetirementEndorsementDTO | null;
    letterCertification: RetirementEndorsementDTO | null;
}