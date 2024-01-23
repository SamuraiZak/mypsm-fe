export interface NewHireSecretaryApprovalResponse {
    status: number;
    message: string;
    data: SecretaryApprovalData;
}

export interface SecretaryApprovalData {
    id: number;
    name: string;
    isApproved: boolean;
    remark: string;
}
