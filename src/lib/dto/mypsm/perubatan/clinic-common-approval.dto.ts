export interface ClinicCommonResult {
    id:     number;
    supporterName?: string;
    approverName?: string;
    status: boolean;
    remark: string;
    isDraft: boolean;
}

// Converts JSON strings to/from your types
export class ClinicCommonResultConvert {
    public static fromJson(json: string): ClinicCommonResult {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicCommonResult): string {
        return JSON.stringify(value);
    }
}