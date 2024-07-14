export interface LeaveApplicationListRequestFilterDTO {
    employeeNumber: string | null;
    name: string | null;
    identityDocumentNumber: string | null;
    allowanceType: string | null;
    applicationDate: string | null;
    status: string | null;
}

export interface LeaveApplicationInfoRequestDTO {
    applicationId: number;
}
