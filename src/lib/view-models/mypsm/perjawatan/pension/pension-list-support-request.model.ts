export interface PensionListSupportRequest {
    pageNum:   number;
    pageSize:  number;
    orderBy:   string;
    orderType: string;
    filter:    Filter;
}

export interface Filter {
    supporterId: number;
}
