export interface ServiceAllowanceInsuransKesihatanDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    allowanceType: string;
    insuranceType: string;
    startDate: Date;
    endDate: Date;
    reason: string;
    region: string;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceInsuransKesihatanDetailConvert {
    public static fromJson(
        json: string,
    ): ServiceAllowanceInsuransKesihatanDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(
        value: ServiceAllowanceInsuransKesihatanDetailDTO,
    ): string {
        return JSON.stringify(value);
    }
}
