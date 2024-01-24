export interface NewHireApproverTableListResponse {
    status: number;
    message: string;
    data: ApproverTable;
}

export interface ApproverTable {
    pageNum: number;
    totalData: number;
    totalPage: number;
    newHires: NewHire[];
}

export interface NewHire {
    candidateId: string;
    candidateName: string;
    temporaryId: string;
    identityCardNo: string;
    email: string;
}
