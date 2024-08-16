import type { DocumentDTO } from '$lib/dto/core/document/document.dto';
import type { TransferApplicationEmployeeDetailType, TransferApplicationServiceDetailType, TransferApplicationTransferDetailType } from '$lib/schemas/mypsm/employment/transfer/transfer.schema';

// list filter
export interface TransferApplicationListFilterDTO {
    employeeName: string | null;
    identityDocumentNumber: string | null;
    employeeNumber: string | null;
    status: string | null;
    transferType: string | null;
}

// list item
export interface TransferApplicationListItemDTO {
    applicationId: number;
    transferType: string;
    category: string;
    employeeNumber: string;
    employeeName: string;
    identityDocumentNumber: string;
    applicationDate: string | null;
    status: string;
    remark: string;
}

// employee personal detail
export interface TransferApplicationPersonalDetailDTO {
    name: string;
    identityDocumentNumber: string;
    employeeNumber: string;
    phone: string;
    maritalStatus: string;
    childCount: number;
    childInSchoolCount: number;
}

// employee service detail
export interface TransferApplicationServiceDetailDTO {
    position: string;
    grade: string;
    hiringDate: string;
    officeName: string;
    officeAddress: string;
    department: string;
    servicePeriod: number;
}

// transfer details
export interface TransferApplicationTransferDetailDTO {
    applicationId: number | null;
    category: string;
    transferType: string;
    employeeId: number | null;
    appliedLocation: string | null;
    reason: string | null;
    remark: string | null;
    workPlaceDistance: number | null;
    employerName: string | null;
    startDate: string | null;
    isDraft: boolean;
    documents: DocumentDTO[];
}

// confirmation
export interface TransferApplicationConfirmationDetail {
    applicationId: number;
    status: boolean;
    date: string;
}

// assign director
export interface TransferApplicationAssignDirectorDTO {
    applicationId?: number;
    directorName?: string;
    identityDocumentNumber: string;
    isDraft: boolean;
}

export interface TransferApplicationMeetingResultDTO {
    meetingDate: string;
    meetingName: string;
    status: boolean;
    remark: string;
}

export interface TransferApplicationDetailsDTO{
    applicationId: number;
    employeeDetails: TransferApplicationEmployeeDetailType;
    serviceDetails: TransferApplicationServiceDetailType;
    transferDetails: TransferApplicationTransferDetailType;
    
}
