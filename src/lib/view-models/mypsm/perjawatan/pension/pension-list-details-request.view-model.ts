
// request

export interface PensionTableFilter {
    pageNum:   number;
    pageSize:  number;
    orderBy:   string;
    orderType: string;
    filter:    Filter;
}

export interface Filter {
}

