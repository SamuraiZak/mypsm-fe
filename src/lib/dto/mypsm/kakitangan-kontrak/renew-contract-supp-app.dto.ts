export interface RenewContractSupporterApprover {
    id?:  number;
    applicationId?: number;
    supporterId: number;
    approverId:  number;
    isDraft: boolean;
    isReadonly?: boolean;
}

// Converts JSON strings to/from your types
export class RenewContractSupporterApproverConvert {
    public static fromJson(json: string): RenewContractSupporterApprover {
        return JSON.parse(json);
    }

    public static toJson(value: RenewContractSupporterApprover): string {
        return JSON.stringify(value);
    }
}

export interface RenewContractSuppAppApproval {
    id:         number;
    name?:       string;
    remark:     string;
    status:     boolean;
    isReadonly?: boolean;
}

// Converts JSON strings to/from your types
export class RenewContractSuppAppApprovalConvert {
    public static fromJson(json: string): RenewContractSuppAppApproval {
        return JSON.parse(json);
    }

    public static toJson(value: RenewContractSuppAppApproval): string {
        return JSON.stringify(value);
    }
}