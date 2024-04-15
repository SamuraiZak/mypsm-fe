export interface SupportApprover {
    id:     number;
    status: boolean;
    remark: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromJson(json: string): SupportApprover {
        return JSON.parse(json);
    }

    public static toJson(value: SupportApprover): string {
        return JSON.stringify(value);
    }
}