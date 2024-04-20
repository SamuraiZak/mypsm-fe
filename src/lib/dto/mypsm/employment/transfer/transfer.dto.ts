export interface TransferDocumentDTO {
    name: string;
    base64: string;
}

export interface TransferDocumentAddDTO {
    id: number;
    documents: TransferDocumentDTO[];
}

export interface TransferCommonEndorsementDTO {
    id: number;
    status: boolean;
    remark: string;
}

export interface TransferCommonEndorserDetailDTO {
    id: number;
    approverIC: string;
    supporterIC: string;
}

export interface TransferCommonHistoryFilterDTO {
    directorName: string | null;
    employeeName: string | null;
    employeeIdentityCardNumber: string | null;
    status: string | null;
    result: string | null;
    applicationType: string | null;
}

export interface TransferCommonHistoryDTO {
    id: number;
    employeeNumber: string;
    employeeName: string;
    identityDocumentNumber: string;
    applicationDate: string;
    status: string;
    result: string;
    applicationType: string;
}

export interface TransferApplicationDetailRequestDTO {
    id: number;
}

export interface TransferCommonApplicationDetailDTO {
    status: string | null;
    applicationDetail: TransferCommonDetailDTO | null;
    meeting: TransferCommonMeetingDTO | null;
    postponeDetail: TransferCommonPostponeApplicationDTO | null;
    postponeDocument: TransferDocumentAddDTO | null;
    postponeResult: TransferCommonPostponeResultDTO | null;
    postponeApproval: TransferCommonEndorsementDTO | null;
    transferDocument: TransferDocumentAddDTO | null;
    endorserDetails: TransferCommonEndorserDetailDTO | null;
    supporterFeedback: TransferCommonEndorsementDTO | null;
    approverFeedback: TransferCommonEndorsementDTO | null;
}

export interface TransferCommonDetailDTO {
    id?: number;
    applicationType: string;
    employeeIC: string;
    newPlacementId: number;
    transferDate: string;
    reason: string;
}

export interface TransferCommonMeetingDTO {
    id: number;
    name: string;
    date: string;
    result: boolean;
    placementId: number;
    programmeId: number;
    effectiveDate: string;
    referenceNo: string;
    referenceDate: string;
    directorIC: string;
}

export interface TransferCommonPostponeApplicationDTO {
    id: number;
    isPostpone: boolean;
    postponeDate: string;
    reason: string;
}

export interface TransferCommonPostponeResultDTO {
    id: number;
    finalEffectiveDate: string;
    approverIC: string;
}
