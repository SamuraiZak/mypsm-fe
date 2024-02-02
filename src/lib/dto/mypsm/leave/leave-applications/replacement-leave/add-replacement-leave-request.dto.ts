export interface AddReplacementLeaveRequest {
    substituteName: string;
    startDate: Date;
    endDate: Date;
    lastLeaveDate: Date;
    replacementType: string;
    dutyDescription: string;
    dutyDate: Date;
    dutyLocation: string;
    dutyStartHour: Date;
    dutyEndHour: Date;
    leaveCategory?: string;
}
