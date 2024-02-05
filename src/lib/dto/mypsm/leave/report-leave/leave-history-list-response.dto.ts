export interface LeaveHistoryListResponse {
    employeeId: number;
    leaveId: number;
    employeeName: string;
    leaveType: string;
    leaveFrom: Date;
    leaveTo: Date;
    leaveTotal: number;
    status: null;
    reason: null;
}
