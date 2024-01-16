// =================================================================
// Salary Allowance List View Model
// =================================================================

export interface SalaryAllowanceListViewModel {
    status:  number;
    message: string;
    data:    SalaryAllowanceListData;
}

export interface SalaryAllowanceListData {
    pageNum:    number;
    totalData:  number;
    totalPage:  number;
    allowances: Allowance[];
}

export interface Allowance {
    employeeID:      string;
    employeeName:    string;
    baseSalary:      number;
    allowance:       number;
    salaryDeduction: number;
    status:          string;
}

export class SalaryAllowanceListConvert {
    public static fromJson(json: string): SalaryAllowanceListViewModel {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAllowanceListViewModel): string {
        return JSON.stringify(value);
    }
}
