import type { DocumentDTO } from '$lib/dto/core/document/document.dto';
import type { UpdateList } from '$lib/schemas/mypsm/employment/retirement/retirement-other.schema';

export interface RetirementOtherHistoryFilterDTO {
    employeeNumber: string | null;
    name: string | null;
    identityCardNumber: string | null;
    applicationDate: string | null;
}

export interface RetirementOtherHistoryDTO {
    retirementId: number;
    name: string;
    headCount: number;
    date: string;
    status: string;
}

export interface RetirementOtherAddChosenDTO {
    employeeList: number[];
}

export interface RetirementOtherGetChosenListDTO {
    id: number;
}

export interface RetirementOtherChosenEmployeeDTO {
    groupId: number;
    employeeId: number;
    employeeNumber: string;
    employeeName: string;
    identityCardNumber: string;
    retirementDate: string;
}

export interface RetirementOtherDetailDTO {
    groupID: number;
    employeeID: number;
    employeeNumber: string;
    employeeName: string;
    identityCardNumber: string;
    retirementTypeID: number;
    retirementDate: string;
}

export interface RetirementOtherChosenVerficationDTO {
    groupId: number;
    employeeId: number;
    remark: string;
    status: boolean;
}

export interface RetirementOtherChosenAddVerificationDTO {
    updateList: RetirementOtherChosenVerficationDTO[];
}

export interface RetirementOtherDocumentApproval {
    groupId: number;
    employeeId: number;
    remark: string;
    status: boolean;
    document: DocumentDTO[];
}

export interface RetirementOtherPrintLetter {
    groupId: number;
    employeeId: number;
    document: Document;
}

export interface RetirementOtherUpdateList {
    groupId: number;
    employeeId: number;
    employeeNumber: string;
    employeeName: string;
    identityCardNumber: string;
    retirementTypeId: number;
    retirementDate: string;
}

export interface RetirementOtherApplicationDetailDTO {
    updateList: UpdateList[];
    documentApproval: RetirementOtherDocumentApproval[] | null;
    printLetter: RetirementOtherPrintLetter[] | null;
}

export interface RetirementEmployeeDTO {
    id: number;
    employeeNumber: string;
    name: string;
    identityCardNumber: string;
    programme: string;
    scheme: string;
    grade: string;
    position: string;
    placement: string;
    propertyDeclaration: string;
    educationLoan: boolean;
}

export interface RetirementOtherCreateResultDTO {
    groupId: number;
    employeeList: number[];
}

// ======================================
// REVAMPS
// ======================================
// new application DTO
export interface USPRetirementNewApplicationDTO {
    groupId?: number;
    employeeList: number[];
}

// employee detail
export interface USPRetirementEmployeeDetailDTO {
    groupId: number;
    employeeId: number;
    employeeNumber: string;
    employeeName: string;
    identityCardNumber: string;
    retirementDate: string;
}

// retirement detail
export interface USPRetirementDetailDTO {
    groupId: number;
    employeeId: number;
    retirementTypeId: number;
    retirementDate: string;
}

export interface USPRetirementDocumentApprovalDTO {
    groupId: number;
    employeeId: number;
    remark: string;
    status: boolean;
}

// letter detail
export interface USPRetirementLetterDTO {
    groupId: number;
    employeeId: number;
    document: DocumentDTO;
}

// chosen list detail item
export interface USPRetirementChosenListDetailItemDTO {
    employeeDetail: USPRetirementEmployeeDetailDTO | null;
    retirementDetail: USPRetirementDetailDTO | null;
    documentApproval: USPRetirementDocumentApprovalDTO | null;
    letter: USPRetirementLetterDTO | null;
}

// application detail
export interface USPRetirementApplicationDetailDTO {
    groupId: number;
    chosenListDetail: USPRetirementChosenListDetailItemDTO[];
}

export interface USPRetirementFullApplicationRequestDTO {
    id: number;
}

export interface USPRetirementChosenDetailRequestDTO {
    groupId: number;
    employeeId: number;
}

export interface USPRetirementChosenListFilter {
    groupId: number;
    name: string | null;
    identityDocumentNumber: string | null;
}
