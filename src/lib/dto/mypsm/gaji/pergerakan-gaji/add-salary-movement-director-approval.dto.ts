export interface SalaryMovementDirectorApproval {
    id:         number;
    name?:      string;
    remark:     string;
    status: boolean;
}

// Converts JSON strings to/from your types
export class SalaryMovementDirectorApprovalConvert {
    public static fromJson(json: string): SalaryMovementDirectorApproval {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryMovementDirectorApproval): string {
        return JSON.stringify(value);
    }
}