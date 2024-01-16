// =================================================================
// Salary Allowance Personal Detail View Model
// =================================================================

export interface SalaryAllowanceDetailPersonalViewModel {
    status:  number;
    message: string;
    data:    SalaryAllowanceDetailPersonalData;
}

export interface SalaryAllowanceDetailPersonalData {
    employeeNo:       string;
    name:             string;
    identityCard:     string;
    grade:            string;
    currentPlacement: string;
    group:            string;
}

export class SalaryAllowanceDetailPersonalConvert {
    public static fromJson(json: string): SalaryAllowanceDetailPersonalViewModel {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAllowanceDetailPersonalViewModel): string {
        return JSON.stringify(value);
    }
}