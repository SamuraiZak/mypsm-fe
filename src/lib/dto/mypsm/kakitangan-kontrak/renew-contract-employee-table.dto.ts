export interface RenewContractEmployeeTable {
    contractId:    number;
    startContract: string;
    endContract:   string;
    email:         string;
    status:        string;
    Remark:        string;
}

// Converts JSON strings to/from your types
export class RenewContractEmployeeTableConvert {
    public static fromJson(json: string): RenewContractEmployeeTable[] {
        return JSON.parse(json);
    }

    public static toJson(value: RenewContractEmployeeTable[]): string {
        return JSON.stringify(value);
    }
}
