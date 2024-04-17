export interface QuarterCommonApproval {
    id:     number;
    status: boolean;
    remark: string;
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