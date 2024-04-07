export interface SalaryAllowanceApproval {
    id:     number;
    year?:   number;
    month?:  number;
    status: boolean;
    remark: string;
    name?:  string;
}

// Converts JSON strings to/from your types
export class SalaryAllowanceApprovalConvert {
    public static fromJson(json: string): SalaryAllowanceApproval {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAllowanceApproval): string {
        return JSON.stringify(value);
    }
}