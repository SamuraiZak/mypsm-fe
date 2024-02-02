export interface AddNewOfferRequestBody {
    meetingGroupName: number;
    meetingDate:      Date;
    employees:        Employee[];
}

export interface Employee {
    employeeId: number;
}
