export interface ListChosenEmployeeListRequest {
    pageNum:   number;
    pageSize:  number;
    orderBy:   string;
    orderType: string;
    filter:    Filter;
}

export interface Filter {
    employeeIds: number[];
}
