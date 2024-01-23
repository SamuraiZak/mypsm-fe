// respnse
export interface PensionTableResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:        number;
    totalData:      number;
    totalPage:      number;
    pensionDetails: PensionDetail[];
}

export interface PensionDetail {
    employeeNo:      string;
    employeeName:    string;
    identityCardNo:  string;
    category:        Category;
    applicationDate: Date;
    status:          string;
    remark:          string;
}

export enum Category {
    Tetap = "tetap",
}

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

