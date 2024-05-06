import type { DocumentDTO } from '$lib/dto/core/document/document.dto';

// allowance type
export interface AllowanceTypeDTO {
    id: number;
    code: string;
    description: string;
    suffix: string;
    process: AllowanceApplicationProcessDTO;
}

// allowance application process
export interface AllowanceApplicationProcessDTO {
    applicationDetail: boolean;
    documents: boolean;
    directorFeedback: boolean;
    secretaryCheck: boolean;
    endorserDetails: boolean;
    supporterFeedback: boolean;
    approverFeedback: boolean;
    financeLetter: boolean;
    localOrder: boolean;
    paymentConfirmation: boolean;
}

// allowance application list item
export interface AllowanceApplicationListItem {
    allowanceId: string;
    employeeId: string;
    employeeNumber: string;
    name: string;
    identityCardNumber: string;
    allowanceType: string;
    allowanceTypeCode: string;
    category: string;
    applicationDate: string;
    total: number;
    status: string;
    remark: string | null;
}

// allowance application list filter
export interface AllowanceApplicationListFilter {
    employeeNumber: string;
    name: string;
    allowanceType: string;
    applicationDate: string;
    status: string;
}

// ============================================================
// Allowance Detail By Type
// ============================================================

// 1. Ceremony Clothing
export interface AllowanceDetailCeremonyClothingDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    reason: string;
    personal: number;
    partner: number;
}

// 2. Warm Clothing
export interface AllowanceDetailWarmClothingDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    reason: string;
    personal: number;
    partner: number;
}

// 3. Hometown Visit Fare
export interface AllowanceDetailHometownVisitDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    applyCode: string;
    stateCode: string;
    familyDetail: AllowanceDetailHometownVisitFamilyDTO[];
}

export interface AllowanceDetailHometownVisitFamilyDTO {
    name: string;
    age: number;
    relationshipCode: string;
}

// 4. Funeral Fund
export interface AllowanceDetailFuneralFundDTO {
    allowanceTypeCode: string;
    identityCardNumber: string;
    deathDate: string;
    deathTime: string;
}

// 5. Welfare Fund
export interface AllowanceDetailWelfareFundDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    welfareTypeCode: string;
}

// 6. House Moving
export interface AllowanceDetailWelfareFundDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    movingDate: string;
    oldAddress: string;
    newAddress: string;
}

// 7. Passport Renewal
export interface AllowanceDetailPassportClaimDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    renewDate: string;
    reason: string;
}

// 8. Health Insurance
export interface AllowanceDetailHealthInsuranceDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    regionCode: string;
    insuranceType: string;
    startDate: string;
    endDate: string;
    reason: string;
}

// 9. Shipping Claim

// ============================================================
// Allowance Shared DTO
// ============================================================

// allowance endorsement
export interface AllowanceEndorsementDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    remark: string;
    status: boolean;
}

// allowance endorser
export interface AllowanceEndorserDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    supporter: string;
    approver: boolean;
}

// ============================================================
// Allowance Application Detail
// ============================================================

export interface AllowanceApplicationDetailDTO {
    applicationDetail: null | any;
    documents: DocumentDTO[] | null;
    directorFeedback: AllowanceEndorsementDTO | null;
    secretaryCheck: AllowanceEndorsementDTO | null;
    endorserDetails: AllowanceEndorserDetailDTO | null;
    supporterFeedback: AllowanceEndorsementDTO | null;
    approverFeedback: AllowanceEndorsementDTO | null;
    financeLetter: DocumentDTO[] | null;
    localOrder: DocumentDTO[] | null;
    paymentConfirmation: AllowanceEndorsementDTO | null;
}
