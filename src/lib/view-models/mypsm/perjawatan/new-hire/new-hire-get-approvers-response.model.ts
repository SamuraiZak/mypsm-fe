export interface NewHireGetApproversResponse {
    status: number;
    message: string;
    data: SupporterApprovalData;
}

export interface SupporterApprovalData {
    isReadonly: boolean;
    supporterId: number;
    approverId: number;
}
