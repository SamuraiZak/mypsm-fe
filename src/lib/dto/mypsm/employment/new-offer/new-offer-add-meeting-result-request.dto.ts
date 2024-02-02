export interface NewOfferCreateMeetingResultRequest {
    meetingId: number;
    employees: Employee[];
}

export interface Employee {
    employeeNumber: string;
    employeeName: string;
    remarks: string;
    isApproved: boolean;
}
