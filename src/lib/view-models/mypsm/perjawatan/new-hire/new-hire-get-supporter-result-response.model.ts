export interface NewHireSupporterResultResponse {
    status: number;
    message: string;
    data: NewHireSupporterResult;
}

export interface NewHireSupporterResult {
    id: number;
    name: string;
    remark: string;
    isApproved: boolean;
}
