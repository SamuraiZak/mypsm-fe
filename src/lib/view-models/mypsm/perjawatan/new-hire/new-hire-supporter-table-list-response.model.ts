export interface NewHireSupporterTableListResponse {
    status: number;
    message: string;
    data: NewHireSupporterTableList;
}

export interface NewHireSupporterTableList {
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
