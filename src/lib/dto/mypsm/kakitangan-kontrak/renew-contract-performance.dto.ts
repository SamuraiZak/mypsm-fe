export interface RenewContractAddPerfomance {
    contractId:      number;
    year:            number;
    performanceMark: number;
    result:          boolean;
}

// Converts JSON strings to/from your types
export class RenewContractAddPerfomanceConvert {
    public static fromJson(json: string): RenewContractAddPerfomance {
        return JSON.parse(json);
    }

    public static toJson(value: RenewContractAddPerfomance): string {
        return JSON.stringify(value);
    }
}

export interface RenewContractGetPerfomance {
    name:            string;
    year:            number;
    performanceMark: number;
    status:          boolean;
    isReadonly:      boolean;
}

// Converts JSON strings to/from your types
export class RenewContractGetPerfomanceConvert {
    public static fromJson(json: string): RenewContractGetPerfomance {
        return JSON.parse(json);
    }

    public static toJson(value: RenewContractGetPerfomance): string {
        return JSON.stringify(value);
    }
}