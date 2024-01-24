export interface PensionDetailSalaryResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    salary: Salary;
}

export interface Salary {
    effectiveDate: string;
    baseSalary:    string;
    ITKA:          string;
    ITP:           number;
    EPW:           number;
    COLA:          string;
}
