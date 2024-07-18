export interface QuarterCommonApproval {
    id:     number;
    status: boolean;
    remark: string;
    isDraft: boolean;
}

// Converts JSON strings to/from your types
export class QuarterCommonApprovalConvert {
    public static fromJson(json: string): QuarterCommonApproval {
        return JSON.parse(json);
    }

    public static toJson(value: QuarterCommonApproval): string {
        return JSON.stringify(value);
    }
}

export interface QuarterSecretaryApproval {
    id:     number;
    status: boolean;
    remark: string;
    isDraft: boolean;
    directorApproverId: number;
}

// Converts JSON strings to/from your types
export class QuarterSecretaryApprovalConvert {
    public static fromJson(json: string): QuarterSecretaryApproval {
        return JSON.parse(json);
    }

    public static toJson(value: QuarterSecretaryApproval): string {
        return JSON.stringify(value);
    }
}