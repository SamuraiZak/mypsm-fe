// ======================================================
// SHARED
// ======================================================
export interface RetirementEndorsementDTO {
    voluntaryId: number;
    status: boolean;
    remark: string;
}

export interface RetirementEndorserDetail {
    voluntaryId: number;
    supporter1: string;
    supporter2: string;
    approver: string;
    isReadOnly: boolean;
}

// ======================================================
// VOLUNTARY
// ======================================================
// detail
export interface RetirementVoluntaryDetailDTO {
    voluntaryId?: number;
    retirementDate: string;
    newRetirementDate: string;
    reason: string;
}

export interface RetirementOriginalDetailDTO {
    retirementDatee: string;
}

// detail request DTO
export interface RetirementVoluntaryApplicationDetailRequestDTO {
    voluntaryId?: number;
}

export interface RetirementVoluntaryApplicationDetail {
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

// ======================================================
// FORCED
// ======================================================

export interface RetirementForcedTransferRequestDTO {
    forcedId: number;
}

// use for urus setia table view
export interface RetirementForcedHistorySecretaryDTO {
    retirementId: number;
    employeeNumber: string;
    position: string;
    name: string;
    retirementDate: string;
    earlyRetirementDate: string;
    currentPlacement: string;
    retirementType: string;
    status: string;
}

// user for kakitangan table view
export interface RetirementForcedHistoryEmployeeDTO {
    retirementId: string;
    employeeNumber: string;
    name: string;
    identityCardNumber: string;
    applicationDate: Date;
    status: string;
    remark: string;
}

export interface RetirementForcedEndorsementDTO {
    forcedID: number;
    name?: string;
    remark: string;
    status: boolean;
}

export interface RetirementDocumentDTO {
    name: string;
    base64: string;
}

export interface RetirementDocumentAddDTO {
    id: number;
    documents: RetirementDocumentDTO[];
}

export interface RetirementForcedApplicationDTO {
    certificationDetail: RetirementForcedEndorsementDTO | null;
    confirmationDetail: RetirementForcedEndorsementDTO | null;
    document: RetirementDocumentAddDTO | null;
    documentCertification: RetirementForcedEndorsementDTO | null;
    letterCertificationDetail: RetirementForcedEndorsementDTO | null;
}

// ======================================================
// OTHERS
// ======================================================
export interface RetirementOthersDetailDTO {
    groupId: number;
    employeeList: number[];
}
