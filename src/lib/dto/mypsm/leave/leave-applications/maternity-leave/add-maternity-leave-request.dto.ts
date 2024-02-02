export interface AddMaternityLeaveRequest {
    leaveType: string;
    startDate: Date;
    endDate: Date;
    reason?: string;
    expectedDeliveryDate?: Date;
    currentAddress?: string;
}
