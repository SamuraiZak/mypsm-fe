export interface EmployeeSalaryDetail {
    name?:         string;
    grade?:        string;
    annualSalary?: number;
    untilDate?:    string;
    isDraft:       boolean;
    employeeId?:    number;
    allowance:    SalaryDetail[];
    deduction:    SalaryDetail[];
}

export interface SalaryDetail {
    decription: string;
    amount:     number;
}

// Converts JSON strings to/from your types
export class EmployeeSalaryDetailConvert {
    public static fromJson(json: string): EmployeeSalaryDetail {
        return JSON.parse(json);
    }

    public static toJson(value: EmployeeSalaryDetail): string {
        return JSON.stringify(value);
    }
}

export interface FinalSalaryCert {
    id:       number;
    document: string;
}