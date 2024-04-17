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
    employeeID?: string | null;
    identityCard?: string | null;
    employeeNo?: string | null;
    name?: string | null;
    position?: string | null;
    status?: string | null;
}

export interface LeaveApplicationFilterDTO {
    year?: number | null;
    employeeName?: string | null;
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

export interface LeaveApplicationDetailRequestDTO{
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

// document add
export interface LeaveDocumentAddDTO {
    name: string;
    base64: string;
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

export interface LeaveApplicationDetailDTO {
    applicationDetail?: any | null;
    headOfDirectorFeedback?: LeaveEndorsmentDTO | null;
    directorFeedback?: LeaveEndorsmentDTO | null;
    secretaryVerification?: LeaveEndorsmentDTO | null;
    endorserDetail?: LeaveEndorserDetailsDTO | null;
    supporterFeedback?: LeaveEndorsmentDTO | null;
    approverFeedback?: LeaveEndorsmentDTO | null;
    managementFeedback?: LeaveEndorsmentDTO | null;
    meeting?: LeaveEndorsmentDTO | null;
    document?: LeaveDocumentViewDTO[] | null;
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
