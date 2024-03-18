export interface ServiceAllowanceConfirmationDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    name: string;
    remark: string;
    status: boolean;
    statusDescription: string;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceConfirmationConvert {
    public static fromJson(json: string): ServiceAllowanceConfirmationDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ServiceAllowanceConfirmationDTO): string {
        return JSON.stringify(value);
    }
}
