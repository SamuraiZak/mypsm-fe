export interface NewOfferMeetingResultResponse {
    employees: Employee[];
}

export interface Employee {
    employeeNumber: string;
    employeeName: string;
    remarks: string;
    isApproved: boolean;
}
