export interface HRMISLeaveDTO {
    hrmisLeaveId: string;
    employeeNo: string;
    employeeName: string;
    leaveType: string;
    leaveRequestDate: string;
    leaveFrom: string;
    leaveTo: string;
    reason: string;
    status: string;
    leaveTotal: number;
    approverName: string;
}

export interface HRMISLeaveFilterDTO {
    identityCard: string | null;
    staffNo: string | null;
    staffName: string | null;
    position: string | null;
    status: string | null;
}

export interface HRMISOutOfOfficeDTO {
    hrmisOutOfOfficeId: string;
    employeeNo: string;
    employeeName: string;
    reason: string;
    requestDate: string;
    from: string;
    to: string;
    status: string;
    duration: number;
    approverName: string;
}
