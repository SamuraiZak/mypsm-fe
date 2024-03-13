export interface ServiceAllowanceDirectorFeedbackDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    remark: string;
    status: boolean;
    statusDescription?: string;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceDirectorFeedbackConvert {
    public static fromJson(json: string): ServiceAllowanceDirectorFeedbackDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ServiceAllowanceDirectorFeedbackDTO): string {
        return JSON.stringify(value);
    }
}
