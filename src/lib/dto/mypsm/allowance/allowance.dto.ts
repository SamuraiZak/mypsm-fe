import type { DocumentDTO } from '$lib/dto/core/document/document.dto';

export interface AllowanceDetailRequestDTO {
    allowanceId: number;
    allowanceTypeCode: string;
}

export interface AllowanceApplicationListDTO {
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

export interface AllowanceApplicationFilterDTO {
    employeeNumber: string | null;
    name: string | null;
    identityDocumentNumber: string | null;
    allowanceType: string | null;
    applicationDate: string | null;
    status: string | null;
}

export interface AllowanceStepperDTO {
    detail: boolean;
    upload: boolean;
    directorFeedback: boolean;
    secretaryCheck: boolean;
    endorserDetail: boolean;
    supporterFeedback: boolean;
    approverFeedback: boolean;
    secretaryVerification: boolean;
    confirmation: boolean;
}

export interface AllowanceTypeDTO {
    id: number;
    code: string;
    description: string;
    url: string;
    stepper: AllowanceStepperDTO;
}

export interface AllowanceEndorsementDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    remark: string;
    status: boolean;
}

export interface AllowanceEndorserDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    supporter: string;
    approver: string;
}

export interface AllowanceFamilyDetailDto {
    name: string;
    age: string;
    relationshipCode: string;
}

// ceremony clothing details
export interface AllowanceCeremonyClothingDetailDTO {
    allowanceId?: number;
    allowanceTypeCode: string;
    documents?: DocumentDTO[];
    reason: string;
    personal: number;
    partner: number;
}

// winter clothing details
export interface AllowanceWinterClothingDetailDTO {
    allowanceId?: number;
    allowanceTypeCode: string;
    documents?: DocumentDTO[];
    reason: string;
    personal: number;
    partner: number;
}

// state visit details
export interface AllowanceStateVisitDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    documents?: DocumentDTO[];
    applyCode: string;
    stateCode: string;
    familyDetail: AllowanceFamilyDetailDto[];
}

export interface AllowanceFuneralArrangmentDetailDTO {
    allowanceId?: number;
    allowanceTypeCode: string;
    documents?: DocumentDTO[];
    deathDate: string;
    deathTime: string;
}

// welfare fund
export interface AllowanceWelfareFundDetailDTO {
    allowanceId?: number;
    allowanceTypeCode: string;
    welfareTypeCode: string;
    documents?: DocumentDTO[];
}

// house moving
export interface AllowanceHouseMovingDetailDTO {
    allowanceId?: number;
    allowanceTypeCode: string;
    movingDate: string;
    oldAddress: string;
    newAddress: string;
    documents?: DocumentDTO[];
}

// passport payment details
export interface AllowancePassportPaymentDetailsDTO {
    allowanceId?: number;
    allowanceTypeCode: string;
    renewDate: string;
    reason: string;
    documents?: DocumentDTO[];
}

// insurance payment
export interface AllowanceInsurancePaymentDetailsDTO {
    allowanceId?: number;
    allowanceTypeCode: string;
    regionCode: string;
    insuranceType: string;
    startDate: string;
    endDate: string;
    reason: string;
    documents?: DocumentDTO[];
}

// cargo shipping

// application detail
export interface AllowanceAplicationDetailDTO {
    applicationDetail?: any | null;
    directorSupport?: AllowanceEndorsementDTO | null;
    verification?: AllowanceEndorsementDTO | null;
    supportApprover?: AllowanceEndorserDetailDTO | null;
    support?: AllowanceEndorsementDTO | null;
    approval?: AllowanceEndorsementDTO | null;
}
