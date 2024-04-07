export interface SalaryAllowanceIDRequest {
    employeeId: number;
    year:       number;
    month:      number;
}

// Converts JSON strings to/from your types
export class SalaryAllowanceIDRequestConvert {
    public static fromJson(json: string): SalaryAllowanceIDRequest {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAllowanceIDRequest): string {
        return JSON.stringify(value);
    }
}