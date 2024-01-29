export interface ListChosenEmployeeList {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    pageNum:             number;
    totalData:           number;
    totalPage:           number;
    chosenEmployeeLists: ChosenEmployeeList[];
}

export interface ChosenEmployeeList {
    employeeNumber:   string;
    employeeName:     string;
    ICNumber:         string;
    programme:        string;
    scheme:           string;
    grade:            string;
    position:         string;
    currentPlacement: string;
}