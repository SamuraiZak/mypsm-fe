export interface Eligibility {
    id:                 number;
    baseSalary:         number;
    salaryCut:          number;
    balance:            number;
    salaryAndAllowance: number;
    newSalaryCut:       number;
    newBalance:         number;
}

// Converts JSON strings to/from your types
export class EligibilityConvert {
    public static fromJson(json: string): Eligibility {
        return JSON.parse(json);
    }

    public static toJson(value: Eligibility): string {
        return JSON.stringify(value);
    }
}