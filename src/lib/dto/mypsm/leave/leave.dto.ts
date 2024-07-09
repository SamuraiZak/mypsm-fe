import type { DocumentDTO } from '$lib/dto/core/document/document.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';

export interface LeaveEntitlementDTO {
    type: string;
    entitlement: number;
    carryForward: number;
    total: number;
    used: number;
    balance: number;
}

export interface LeaveEntitlementFilterDTO {
    year?: number | null;
    employeeId?: number | null;
    identityDocumentNumber?: string | null;
    employeeNumber?: string | null;
    name?: string | null;
    position?: string | null;
    status?: string | null;
}

export interface LeaveApplicationFilterDTO {
    year?: number | null;
    employeeNumber?: string | null;
    name?: string | null;
    identityDocumentNumber?: string | null;
    leaveType?: string | null;
    status?: string | null;
}

export interface LeaveApplicationDTO {
    leaveId: number;
    employeeName: string;
    employeeNumber: string;
    leaveType: string;
    leaveCode: string;
    startDate: string;
    endDate: string;
    durationDays: number;
    status: string;
    reason: string;
    applicationDate: string;
}

// =============================================
// Common Leave DTO
// =============================================
export interface LeaveAddEndorsementDTO {
    leaveId: number;
    status: boolean;
    remark: string;
}

export interface LeaveViewEndorsementDTO {
    status: boolean;
    remark: string;
}

export interface LeaveEndorsementRequestDTO {
    leaveId: number;
}

// =============================================
// Unrecorded Leave
// =============================================
// add detail dto
export interface LeaveAddUnrecordedDTO {
    startDate: string;
    endDate: string;
    untrackedLeaveTypeCode: string;
    reason: string;
    halfDayOption: boolean;
    halfDayType?: string | null;
}

// view detail dto
export interface LeaveViewUnrecordedDTO {
    alternateUntrackedLeaveId: number;
    processId: number;
    untrackedLeaveTypeId: string;
    untrackedLeaveTypeCode: string;
    untrackedLeaveTypeDescription: string;
    reason: string;
    startDate: string;
    endDate: string;
    durationDays: number;
    halfDayOption: boolean;
    halfDayType: string;
}

// =============================================
// Extended Sick Leave
// =============================================
// add detail dto
export interface LeaveAddExtendedSickDTO {
    startDate: string;
    endDate: string;
    reason: string;
    halfDayOption: boolean;
    halfDayType?: string | null;
}

// view detail dto
export interface LeaveViewExtendedSickDTO {
    extendedSickLeaveId: number;
    processId: number;
    reason: string;
    startDate: string;
    endDate: string;
    durationDays: number;
    halfDayOption: boolean;
    halfDaytype: string;
    isMoreThan90Days: boolean;
}

// =============================================
// Half Paid Leave
// =============================================
// add detail dto
export interface LeaveAddHalfPayDTO {
    startDate: string;
    endDate: string;
    reason: string;
    halfDayOption: boolean;
    halfDayType?: string | null;
}

// view detail dto
export interface LeaveViewHalfPayDTO {
    halfPayLeaveId: number;
    processId: number;
    reason: string;
    startDate: string;
    endDate: string;
    durationDays: number;
    halfDayOption: boolean;
    halfDayType?: string | null;
    isMoreThan14Days: boolean;
}

// ===========================================================
// Revamps
// ===========================================================

export interface LeaveApplicationDetailRequestDTO {
    leaveId: number;
    leaveTypeCode: string;
}

// leave endorsment
export interface LeaveEndorsmentDTO {
    leaveId: number;
    leaveTypeCode: string;
    remark: string;
    status: boolean;
}

// endorser details
export interface LeaveEndorserDetailsDTO {
    leaveId: number;
    leaveTypeCode: string;
    supporterName?: string;
    supporterIC: string;
    approverName?: string;
    approverIC: string;
}

// document view
export interface LeaveDocumentViewDTO {
    name: string;
    document: string;
}

export interface LeaveDocumentWrapperDTO {
    leaveId: number;
    document: LeaveDocumentAddDTO[];
}

// document add
export interface LeaveDocumentAddDTO {
    name: string;
    base64: string;
}

export interface LeaveDocumentUploadDTO {
    leaveId: number;
    documents: LeaveDocumentAddDTO[];
}

// common leave details
export interface LeaveCommonDetailsDTO {
    leaveId?: number;
    leaveTypeCode: string;
    startDate: string;
    endDate: string;
    reason: string;
    startHalfDayOption: boolean;
    startHalfDayType: string;
    endHalfDayOption: boolean;
    endHalfDayType: string;
}

// unrecorded leave details
export interface LeaveUnrecordedDetailsDTO {
    leaveId?: number;
    leaveTypeCode: string;
    startDate: string;
    endDate: string;
    category: string;
    reason: string;
    startHalfDayOption: boolean;
    startHalfDayType: string;
    endHalfDayOption: boolean;
    endHalfDayType: string;
}

// delivery leave details
export interface LeaveDeliveryDetailsDTO {
    leaveId?: number;
    leaveTypeCode: string;
    expectedDeliveryDate: string;
    startDate: string;
    endDate: string;
    reason: string;
    startHalfDayOption: boolean;
    startHalfDayType: string;
    endHalfDayOption: boolean;
    endHalfDayType: string;
}

// study leave
export interface LeaveStudyDetailsDTO {
    leaveId?: number;
    leaveTypeCode: string;
    fieldOfStudy: string;
    institution: string;
    certificationType: string;
    courseName: string;
    startDate: string;
    endDate: string;
    startHalfDayOption: boolean;
    startHalfDayType: string;
    endHalfDayOption: boolean;
    endHalfDayType: string;
    reason: string;
}

// replacement leave
export interface LeaveReplacementDetailsDTO {
    leaveId?: number;
    leaveTypeCode: string;
    reason: string;
    substituteName: string;
    substituteIC: string;
    startDate: string;
    startHalfDayOption: boolean;
    startHalfDayType: string;
    endDate: string;
    endHalfDayOption: boolean;
    endHalfDayType: string;
    durationDays: number;
    latestLeaveTakenDate: string;
    currentYearLeaveCount: number;
    replacementType: string;
    dutyDate: string;
    dutyStartTime: string;
    dutyEndTime: string;
    dutyDurationTime: string;
    dutyLocation: string;
    dutyDescription: string;
}

export interface LeaveApplicationDetailDTO {
    status: string;
    applicationDetail?: any | null;
    headOfDirectorFeedback?: LeaveEndorsmentDTO | null;
    directorFeedback?: LeaveEndorsmentDTO | null;
    secretaryVerification?: LeaveEndorsmentDTO | null;
    endorserDetail?: LeaveEndorserDetailsDTO | null;
    supporterFeedback?: LeaveEndorsmentDTO | null;
    approverFeedback?: LeaveEndorsmentDTO | null;
    managementFeedback?: LeaveEndorsmentDTO | null;
    meeting?: LeaveEndorsmentDTO | null;
    document: LeaveDocumentWrapperDTO | null;
}

export interface LeaveApplicationProcessDTO {
    type: LookupDTO;
    applicationDetail: boolean;
    headOfDirectorFeedback: boolean;
    directorFeedback: boolean;
    secretaryVerification: boolean;
    endorserDetail: boolean;
    supporterFeedback: boolean;
    approverFeedback: boolean;
    managementFeedback: boolean;
    meeting: boolean;
    document: boolean;
}

export interface LeaveEntitlementEditDTO {
    employeeId: number;
    year: number;
    replacementAnnual: LeaveEntitlementDetailDTO;
    alternateUntracked: LeaveEntitlementDetailDTO;
    halfPay: LeaveEntitlementDetailDTO;
    withoutPay: LeaveEntitlementDetailDTO;
    maternity: LeaveEntitlementDetailDTO;
    paternity: LeaveEntitlementDetailDTO;
    remoteReligious: LeaveEntitlementDetailDTO;
    quarantine: LeaveEntitlementDetailDTO;
    unpaidChildCare: LeaveEntitlementDetailDTO;
    extraCourse: LeaveEntitlementDetailDTO;
    officeAbsent: LeaveEntitlementDetailDTO;
    extendedSick: LeaveEntitlementDetailDTO;
    unpaidPair: LeaveEntitlementDetailDTO;
    cancer: LeaveEntitlementDetailDTO;
    tibi: LeaveEntitlementDetailDTO;
}

export interface LeaveEntitlementDetailDTO {
    entitlement: number;
    carryForward: number;
    balance: number;
    leaveEntitlementTypeID: number;
    used: number;
}

// ===============================================
// GCR
// ===============================================

export interface GCRAccumulationHistoryDTO {
    id: number;
    name: string;
    identityCardNo: string;
    totalAnnual: number;
    balance: number;
    collectedGCR: number;
    requesteDate: string;
    status: string;
    remark: string;
}

export interface GCRAccumulationHistoryFilterDTO {
    name: string | null;
    identityDocumentNumber: string | null;
    employeeNumber: string | null;
    status: string | null;
}

export interface GCRAccumulationApplicationDetailDTO {
    personalDetail: GCRAccumulationPersonalDetailDTO | null;
    accumulation: GCRAccumulationDetailDTO | null;
    lead: GCREndorsementDTO | null;
    director: GCREndorsementDTO | null;
    secretary: GCREndorsementDTO | null;
}

export interface GCRAccumulationDetailDTO {
    id?: number;
    year: number;
    annualLeave: number;
    annualBalance: number;
    gcr: number;
    currentCollected: number;
    carryForward: number;
}

export interface GCRAccumulationPersonalDetailDTO {
    name: string;
    identityDocumentNumber: string;
    employeeNumber: string;
    grade: string;
    scheme: string;
    placement: string;
    startDate: string;
}

export interface GCRAccumulationAddDetailDTO {
    collectedGCR: number;
}

export interface GCRAccumulationDetailRequestDTO {
    id: number | null;
    employeeId?: number;
}

export interface GCREndorsementDTO {
    id: number;
    status: boolean;
    remark: string;
    isReadonly: boolean;
}

export interface GCRWithdrawalHistoryDTO {
    id: number;
    name: string;
    identityCard: string;
    dataType: string;
    requesteDate: string;
    status: string;
    remark: string;
}

export interface GCRWithdrawalHistoryFilterDTO {
    dataType: number;
    name: string | null;
    identityDocumentNumber: string | null;
    employeeNumber: string | null;
    status: string | null;
}

export interface GCRWithdrawalDocumentDetailDTO {
    id: number;
    document: DocumentDTO[];
}

export interface GCRWithdrawalCalculationDTO {
    id: number;
    totalPayment: number;
}

export interface GCREmployeeDetailDTO {
    name: string;
    identityDocumentNumber: string;
    employeeNumber: string;
    employeeId: number;
    grade: string;
    scheme: string;
    placement: string;
    startDate: string;
}

export interface GCRWithdrawalDetailDTO {
    totalGCR: number;
    minimumGCR: boolean;
    employmentLength: boolean;
    ageRequirement: boolean;
    firstTimeWithdrawal: boolean;
}

export interface GCRWithdrawalDetailAddDTO {
    employeeID: number;
    withdrawalType: number;
}

export interface GCRWithdrawalApplicationDetailDTO {
    employeeDetail: GCREmployeeDetailDTO | null;
    gcrDetail: GCRWithdrawalDetailDTO | null;
    document: GCRWithdrawalDocumentDetailDTO | null;
    director: GCREndorsementDTO | null;
    secretary: GCREndorsementDTO | null;
    integrity: GCREndorsementDTO | null;
    chiefDirector: GCREndorsementDTO | null;
    calculation: GCRWithdrawalCalculationDTO | null;
}

export interface LeaveEmployeeDetailDTO {
    employeeId: number;
}
