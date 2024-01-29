export interface ListEmployeeList {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:       number;
    totalData:     number;
    totalPage:     number;
    employeeLists: EmployeeList[];
}

export interface EmployeeList {
    employeeNumber: string;
    employeeName:   string;
    ICNumber:       string;
    homeAddress:    string;
    programme:      string;
    scheme:         string;
    grade:          string;
    roles:          string[];
}