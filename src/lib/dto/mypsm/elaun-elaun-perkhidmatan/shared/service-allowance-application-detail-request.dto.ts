export interface ServiceAllowanceApplicationDetailRequestDTO {
    allowanceId: number;
    allowanceTypeCode: string;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceApplicationDetailRequestConvert {
    public static fromJson(
        json: string,
    ): ServiceAllowanceApplicationDetailRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(
        value: ServiceAllowanceApplicationDetailRequestDTO,
    ): string {
        return JSON.stringify(value);
    }
}
