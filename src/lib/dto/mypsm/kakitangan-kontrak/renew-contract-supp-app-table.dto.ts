export interface RenewContractSuppAppTable {
    contractId:     number;
    candidateName:  string;
    temporaryId:    string;
    identityCardNo: string;
    email:          string;
    status:         string;
    remark:         string;
}

// Converts JSON strings to/from your types
export class RenewContractSuppAppTableConvert {
    public static fromJson(json: string): RenewContractSuppAppTable[] {
        return JSON.parse(json);
    }

    public static toJson(value: RenewContractSuppAppTable[]): string {
        return JSON.stringify(value);
    }
}