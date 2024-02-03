export interface UnrecordLeaveResponse {
    alternateUntrackedId: number;
    untrackedLeaveType: string;
    reason: string;
    startDate: Date;
    endDate: Date;
    durationDays: number;
}
