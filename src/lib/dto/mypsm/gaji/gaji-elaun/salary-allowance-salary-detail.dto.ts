export interface SalaryAllowanceSalaryDetail {
    salaryLevel:         number;
    baseSalary:          number;
    itka:                number;
    itp:                 number;
    cola:                number;
    salaryMovementMonth: number;
    salaryMovementTotal: number;
}

// Converts JSON strings to/from your types
export class SalaryAllowanceSalaryDetailConvert {
    public static fromJson(json: string): SalaryAllowanceSalaryDetail {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAllowanceSalaryDetail): string {
        return JSON.stringify(value);
    }
}