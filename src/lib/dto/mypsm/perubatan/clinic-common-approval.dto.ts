export interface ClinicCommonResult {
    id:     number;
    status: boolean;
    remark: string;
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