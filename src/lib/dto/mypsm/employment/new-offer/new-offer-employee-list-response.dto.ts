export interface NewOfferEmployeeListResponse {
    employees: Employee[];
}

export interface Employee {
    employeeNumber: string;
    employeeName: string;
    identityDocumentNumber: string;
    grade: string;
    position: string;
    educationLevel: string;
    eligibleLeaveCount: number;
}
