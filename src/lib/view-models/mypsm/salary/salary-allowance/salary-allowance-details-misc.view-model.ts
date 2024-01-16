// =================================================================
// Salary Allowance Details Other View Model
// =================================================================

export interface SalaryAllowanceDetailOtherViewModel {
    status:  number;
    message: string;
    data:    SalaryAllowanceDetailOtherData[];
}

export interface SalaryAllowanceDetailOtherData {
    employeeID: string;
    name:       string;
    total:      number;
    fromDate:   Date;
    toDate:     Date;
}

export class SalaryAllowanceDetailOtherConvert {
    public static fromJson(json: string): SalaryAllowanceDetailOtherViewModel {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAllowanceDetailOtherViewModel): string {
        return JSON.stringify(value);
    }
}