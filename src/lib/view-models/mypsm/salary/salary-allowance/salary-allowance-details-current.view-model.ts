// =================================================================
// Salary Allowance Details Current View Model
// =================================================================

export interface SalaryAllowanceDetailCurrentViewModel {
    status: number;
    message: string;
    data: SalaryAllowanceDetailCurrentData;
}

export interface SalaryAllowanceDetailCurrentData {
    salaryLevel: number;
    baseSalary: number;
    itka: number;
    itp: number;
    cola: number;
    salaryMovementMonth: number;
    salaryMovementTotal: number;
}

export class SalaryAllowanceDetailCurrentConvert {
    public static fromJson(
        json: string,
    ): SalaryAllowanceDetailCurrentViewModel {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAllowanceDetailCurrentViewModel): string {
        return JSON.stringify(value);
    }
}
