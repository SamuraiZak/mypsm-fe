export interface HrmisOutOfOfficeLeavesResponse {
    hrmisOutOfOfficeId: string;
    employeeNo: string;
    employeeName: string;
    reason: string;
    requestDate: Date;
    from: string;
    to: string;
    status: string;
    duration: number;
    approverName: string;
}
