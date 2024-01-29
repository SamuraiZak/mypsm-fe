export interface ListInterviewResultMark {
    pageNum:   number;
    pageSize:  number;
    orderBy:   string;
    orderType: string;
    filter:    Filter;
}

export interface Filter {
    actingIds: number[];
}