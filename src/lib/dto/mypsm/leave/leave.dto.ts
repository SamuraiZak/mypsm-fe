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
    startDate: Date;
    endDate: Date;
    durationDays: number;
    halfDayOption: boolean;
    halfDayType?: string | null;
    isMoreThan14Days: boolean;
}
