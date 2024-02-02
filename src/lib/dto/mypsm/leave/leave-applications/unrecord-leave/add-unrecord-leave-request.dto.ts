export interface AddUnrecordLeaveRequest {
    untrackedLeaveType: string;
    reason: string;
    startDate: Date;
    endDate: Date;
}
