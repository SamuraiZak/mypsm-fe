export interface SalaryAllowancePersonalDetail {
    employeeNo:       number;
    name:             string;
    identityCard:     string;
    grade:            string;
    currentPlacement: string;
    group:            string;
    status:           string;
}

// Converts JSON strings to/from your types
export class SalaryAllowancePersonalDetailConvert {
    public static fromJson(json: string): SalaryAllowancePersonalDetail {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAllowancePersonalDetail): string {
        return JSON.stringify(value);
    }
}