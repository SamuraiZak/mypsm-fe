export interface Approver {
    id:         number;
    approverId: number;
    isDraft: boolean;
}

// Converts JSON strings to/from your types
export class ApproverConvert {
    public static fromJson(json: string): Approver {
        return JSON.parse(json);
    }

    public static toJson(value: Approver): string {
        return JSON.stringify(value);
    }
}