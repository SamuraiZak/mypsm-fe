export interface AddChosenEmployeeList {
    status:  number;
    message: string;
    data:    Datum[];
}

export interface Datum {
    gradeActingId: number;
    employeeName:  string;
}