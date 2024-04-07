export interface SalaryAllowanceList {
    employeeId:      number;
    employeeName:    string;
    baseSalary:      number;
    allowance:       number;
    salaryDeduction: number;
    status:          string;
}

// Converts JSON strings to/from your types
export class SalaryAllowanceListConvert {
    public static fromJson(json: string): SalaryAllowanceList[] {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAllowanceList[]): string {
        return JSON.stringify(value);
    }
}