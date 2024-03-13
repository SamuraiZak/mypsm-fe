export interface ServiceAllowanceVerificationDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    remark: string;
    status: boolean;
    statusDescription?: string;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceVerificationConvert {
    public static fromJson(json: string): ServiceAllowanceVerificationDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ServiceAllowanceVerificationDTO): string {
        return JSON.stringify(value);
    }
}
