export interface ServiceAllowanceSuppAppDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    supporter: string;
    approver: string;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceSuppAppDetailConvert {
    public static fromJson(json: string): ServiceAllowanceSuppAppDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ServiceAllowanceSuppAppDetailDTO): string {
        return JSON.stringify(value);
    }
}
