export interface FinalSalaryDetail {
    adjustment: FinalSalaryAdjustment[];
    deduction:  FinalSalaryDeduction[];
}

export interface FinalSalaryAdjustment {
    name:        string;
    monthYear:   string;
    description: string;
    price:       number;
    total:       number;
    remark:      string;
}

export interface FinalSalaryDeduction {
    name:        string;
    monthYear:   string;
    description: string;
    price:       number;
    total:       number;
    remark:      string;
}

// Converts JSON strings to/from your types
export class FinalSalaryDetailConvert {
    public static fromJson(json: string): FinalSalaryDetail {
        return JSON.parse(json);
    }

    public static toJson(value: FinalSalaryDetail): string {
        return JSON.stringify(value);
    }
}