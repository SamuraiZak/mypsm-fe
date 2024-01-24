export interface NewHireApproverTableListRequestBody {
    pageNum: number;
    pageSize: number;
    orderBy?: string;
    orderType?: string;
    filter?: NewHireApproverTableListFilter;
}

export interface NewHireApproverTableListFilter {
    identityCard?: string;
    staffNo?: number;
    staffName?: string;
    dateRequest?: Date;
    dateHire?: Date;
    status?: string;
}
