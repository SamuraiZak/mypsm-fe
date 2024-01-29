export interface EditInterviewInfo {
    pageNum:   number;
    pageSize:  number;
    orderBy:   string;
    orderType: string;
    filter:    Filter;
}

export interface Filter {
    employeeIds: number[];
}