export interface NewHireSupporterTableListRequestBody {
    pageNum: number;
    pageSize: number;
    orderBy?: string;
    orderType?: string;
    filter?: NewHireSupporterTableListFilter;
}

export interface NewHireSupporterTableListFilter {
    identityCard?: string;
    staffNo?: number;
    staffName?: string;
    dateRequest?: Date;
    dateHire?: Date;
    status?: string;
}
