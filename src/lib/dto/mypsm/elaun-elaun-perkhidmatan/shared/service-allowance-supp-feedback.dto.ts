export interface ServiceAllowanceSuppFeedbackDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    remark: string;
    status: boolean;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceSuppFeedbackConvert {
    public static fromJson(json: string): ServiceAllowanceSuppFeedbackDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ServiceAllowanceSuppFeedbackDTO): string {
        return JSON.stringify(value);
    }
}
