export interface ServiceAllowanceApproverFeedbackDTO {
    allowanceID: number;
    allowanceTypeCode: string;
    remark: string;
    status: boolean;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceApproverFeedbackConvert {
    public static fromJson(json: string): ServiceAllowanceApproverFeedbackDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ServiceAllowanceApproverFeedbackDTO): string {
        return JSON.stringify(value);
    }
}
