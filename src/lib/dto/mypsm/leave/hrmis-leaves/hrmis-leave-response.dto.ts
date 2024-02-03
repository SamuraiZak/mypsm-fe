export interface HrmisLeavesResponse {
    hrmisLeaveId: string;
    employeeNo: string;
    employeeName: string;
    leaveType: string;
    leaveRequestDate: Date;
    leaveFrom: Date;
    leaveTo: Date;
    reason: string;
    status: string;
    leaveTotal: number;
    approverName: string;
}
