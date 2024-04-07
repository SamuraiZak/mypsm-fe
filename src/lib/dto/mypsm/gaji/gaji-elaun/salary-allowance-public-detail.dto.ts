export interface SalaryAllowancePublicDetail {
    leaves:    SalaryAllowanceLeave[];
    deduction: SalaryAllowanceDeduction[];
    isReadonly?: boolean;
}

export interface SalaryAllowanceDeduction {
    id:     number;
    type:   string;
    amount: number;
    description?: string;
    remark: string;
}

export interface SalaryAllowanceLeave {
    type:       string;
    code:       string;
    fromDate:   string;
    toDate:     string;
    reason:     string;
    status:     string;
    totalLeave: number;
    amount:     number;
    remark:     string;
}

// Converts JSON strings to/from your types
export class SalaryAllowancePublicDetailConvert {
    public static fromJson(json: string): SalaryAllowancePublicDetail {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAllowancePublicDetail): string {
        return JSON.stringify(value);
    }
}
// Converts JSON strings to/from your types
export class SalaryAllowanceDeductionConvert {
    public static fromJson(json: string): SalaryAllowanceDeduction {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryAllowanceDeduction): string {
        return JSON.stringify(value);
    }
}