export interface ReplacementLeaveResponse {
    substituteName: string;
    startDate: Date;
    endDate: Date;
    currentYearLeaveCount: number;
    latestLeaveTakenDate: Date;
    leaveType: string;
    dutyDescription: string;
    dutyDate: Date;
    dutyLocation: string;
    dutyStartHour: Date;
    dutyEndHour: Date;
    dutyDuration: number;
}
