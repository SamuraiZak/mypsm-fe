export interface AddNewOfferRequest {
    meetingGroupName: number;
    meetingDate:      Date;
    employees:        Employee[];
}

export interface Employee {
    employeeId: number;
}
