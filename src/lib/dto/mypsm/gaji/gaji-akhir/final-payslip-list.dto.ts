export interface FinalPayslipList {
    id:              number;
    employeeNumber:  string;
    name:            string;
    icNumber:        string;
    baseSalary:      number;
    allowances:      number;
    salaryDeduction: number;
    retiremenType:   string;
    status:          string;
    remark:          string;
}

// Converts JSON strings to/from your types
export class FinalPayslipListConvert {
    public static fromjson(json: string): FinalPayslipList[] {
        return JSON.parse(json);
    }

    public static toJson(value: FinalPayslipList[]): string {
        return JSON.stringify(value);
    }
}

export interface FinalPayslipListFilter {
    type:               number;
    employeeNumber:     string;
    name:               string;
    identityDocumentNumber: string;
    retirementType:     string;
    status:             string;
}

// Converts JSON strings to/from your types
export class FinalPayslipListFilterConvert {
    public static fromJson(json: string): FinalPayslipListFilter {
        return JSON.parse(json);
    }

    public static toJson(value: FinalPayslipListFilter): string {
        return JSON.stringify(value);
    }
}