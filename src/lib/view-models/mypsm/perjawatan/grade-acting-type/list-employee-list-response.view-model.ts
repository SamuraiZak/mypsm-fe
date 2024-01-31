export interface ListEmployeeListResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:       number;
    totalData:     number;
    totalPage:     number;
    employeeLists: EmployeeListResponse[];
}

export interface EmployeeListResponse {
    employeeNumber: string;
    employeeName:   string;
    ICNumber:       string;
    homeAddress:    string;
    programme:      string;
    scheme:         string;
    grade:          string;
    roles:          string[];
}