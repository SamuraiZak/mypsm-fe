export interface SalaryAllowanceOtherDetail {
    name:          string;
    submittedDate: string;
    approvedDate:  string;
}

// Converts JSON strings to/from your types
export class SalaryAllowanceOtherDetailConvert {
    public static fromJson(json: string): SalaryAllowanceOtherDetail[] {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAllowanceOtherDetail[]): string {
        return JSON.stringify(value);
    }
}