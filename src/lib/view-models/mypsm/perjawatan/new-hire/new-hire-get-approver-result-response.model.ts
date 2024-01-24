export interface NewHireApproverResultResponse {
    status: number;
    message: string;
    data: NewHireApproverResult;
}

export interface NewHireApproverResult {
    id: number;
    name: string;
    remark: string;
    isApproved: boolean;
}
