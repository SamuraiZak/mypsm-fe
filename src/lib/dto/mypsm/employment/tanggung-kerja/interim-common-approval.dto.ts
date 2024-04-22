export interface InterimCommonApproval {
    interimId: number;
    status: boolean;
    remark: string | null;
}

// Converts JSON strings to/from your types
export class InterimCommonApprovalConvert {
    public static fromJson(json: string): InterimCommonApproval {
        return JSON.parse(json);
    }

    public static toJson(value: InterimCommonApproval): string {
        return JSON.stringify(value);
    }
}