export interface ApproverApproval {
    id:     number;
    status: boolean;
    remark: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromJson(json: string): ApproverApproval {
        return JSON.parse(json);
    }

    public static toJson(value: ApproverApproval): string {
        return JSON.stringify(value);
    }
}