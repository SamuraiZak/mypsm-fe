// ================================================================
// SHARED
// ================================================================

export interface ServiceAllowanceEmployeeDetailRequestDTO {
    allowanceId: number;
}

// Get Details Request
export interface ServiceAllowanceApplicationDetailRequestDTO {
    allowanceId: number;
    allowanceTypeCode: string;
}

// Document
export interface DocumentDTO {
    base64: string;
    name: string;
}

// Assign Director
export interface ServiceAllowanceAssignDirectorDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    employeeId: number;
    identityDocumentNumber: string;
    employeeName: string;
    type: string;
}

// Assign Supporter and Approver
export interface ServiceAllowanceEndorserDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    supporterId: number;
    supporterIdentityDocumentNumber: string;
    supporterName: string;
    approverId: number;
    approverIdentityDocumentNumber: string;
    approverName: string;
    isDraft: boolean;
}

// Endorsement
export interface ServiceAllowanceEndorsementDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    employeeId: number;
    identityDocumentNumber: string;
    name: string;
    status: string | null;
    remark: string | null;
    date: string | null;
    isDraft: boolean;
}

export interface ServiceAllowanceSecretaryConfirmationDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    total: number | null;
    referenceNumber: string | null;
    date: string | null;
    isDraft: boolean;
}

// ===============================================================
// DETAILS EACH TYPE
// ===============================================================

// 1. Ceremony Clothing
export interface ServiceAllowanceCeremonyClothingDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    reason: string;
    personal: number;
    partner: number;
    ceremonyClothingPrevious: boolean;
    ceremonyClothingPreviousDate: string;
    blackTiePrevious: boolean;
    blackTiePreviousDate: null;
    officialClothingPrevious: boolean;
    officialClothingPreviousDate: string;
    isDraft: boolean;
    documents: DocumentDTO[];
}

// 2. Passport Payment
export interface ServiceAllowancePassportPaymentDetailsDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    renewDate: string;
    reason: string;
    isDraft: boolean;
    documents: DocumentDTO[];
}

// 3. other
export interface ServiceAllowanceOtherAllowanceDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    amount: number;
    reason: string;
    isDraft: boolean;
    documents: DocumentDTO[];
}

// 4. house moving
export interface ServiceAllowanceHouseMovingDetail {
    allowanceId: number;
    allowanceTypeCode: string;
    movingDate: string;
    oldAddress: string;
    newAddress: string;
    isDraft: boolean;
    documents: DocumentDTO[];
}

// 5. winter clothing
export interface ServiceAllowanceWinterClothingDetail {
    allowanceId: number;
    allowanceTypeCode: string;
    reason: string;
    personal: number;
    isDraft: boolean;
    documents: DocumentDTO[];
}

// 6. funeral
export interface ServiceAllowanceFuneralDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    employeeNumber: string;
    name: string;
    identityDocumentNumber: string;
    deathDate: string;
    deathTime: string;
    nextOfKinName: string;
    nextOfKinAddress: string;
    relationshipId: number;
    isDraft: boolean;
    documents: DocumentDTO[];
}

// 7. insurance
export interface ServiceAllowanceInsuranceDetail {
    allowanceId:       number;
    allowanceTypeCode: string;
    regionCode:        string;
    insuranceType:     string;
    startDate:         string;
    endDate:           string;
    reason:            string;
    isDraft:           boolean;
    documents:         DocumentDTO[];
}

// 8. welfare fund
export interface ServiceAllowanceWelfareFundDetailDTO {
    allowanceId:       number;
    allowanceTypeCode: string;
    welfareTypeCode:   string;
    isDraft:           boolean;
    documents:         DocumentDTO[];
}

// 9. state visit
export interface ServiceAllowanceStateVisitDetailDTO {
    allowanceId:       number;
    allowanceTypeCode: string;
    applyCode:         string;
    stateCode:         string;
    isDraft:           boolean;
    familyDetail:      FamilyDetailDTO[];
    documents:         DocumentDTO[];
}

export interface FamilyDetailDTO {
    name:             string;
    age:              number;
    relationshipCode: string;
}

export interface ServiceAllowanceCargoShippingDetailDTO {
    allowanceId:       number;
    allowanceTypeCode: string;
    startDate:         string;
    endDate:           string;
    startPoint:        string;
    endPoint:          string;
    distance:          number;
    reason:            string;
    isDraft:           boolean;
    documents:         DocumentDTO[];
}

export interface ServiceAllowanceCargoShippingInvoiceDTO {
    allowanceId:       number;
    allowanceTypeCode: string;
    isDraft:           boolean;
    documents:         DocumentDTO[];
}

// ===============================================================
// APPLICATION DETAILS
// ===============================================================
export interface ServiceAllowanceApplicationDetailDTO {
    applicationDetail?: object | null ;
    assignDirector?: ServiceAllowanceAssignDirectorDTO | null;
    directorSupport?: ServiceAllowanceEndorsementDTO | null;
    verification?: ServiceAllowanceEndorsementDTO | null;
    supporterApprover: ServiceAllowanceEndorserDetailDTO | null;
    support?: ServiceAllowanceEndorsementDTO | null;
    approval?: ServiceAllowanceEndorsementDTO | null;
    confirmation?: ServiceAllowanceSecretaryConfirmationDTO | null;
    secretaryVerification?: ServiceAllowanceEndorsementDTO | null;
    uploadInvoice?: ServiceAllowanceCargoShippingInvoiceDTO | null;
    status: string;
}