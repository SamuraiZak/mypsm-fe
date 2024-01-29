export interface GetPersonalSalaryAllowancesResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    totalData:  number;
    totalPage:  null;
    salaryList: SalaryList[];
}

export interface SalaryList {
    id:         string;
    month:      string;
    baseSalary: number;
    allowance:  number;
}
