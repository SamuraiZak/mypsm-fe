export interface ServiceAllowanceVerificationDTO {
    allowanceID: number;
    allowanceTypeCode: string;
    remark: string;
    status: boolean;
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
