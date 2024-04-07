export interface SalaryAllowanceActingDetail {
    id:     number;
    type:   string;
    amount: number;
    remark: string;
}

// Converts JSON strings to/from your types
export class SalaryAllowanceActingDetailConvert {
    public static fromJson(json: string): SalaryAllowanceActingDetail[] {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAllowanceActingDetail[]): string {
        return JSON.stringify(value);
    }
}