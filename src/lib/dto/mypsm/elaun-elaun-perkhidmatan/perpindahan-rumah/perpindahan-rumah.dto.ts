export interface ServiceAllowancePerpindahanRumahDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    allowanceType: string;
    movingDate: Date;
    oldAddress: string;
    newAddress: string;
}

// Converts JSON strings to/from your types
export class ServiceAllowancePerpindahanRumahDetailConvert {
    public static fromJson(
        json: string,
    ): ServiceAllowancePerpindahanRumahDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(
        value: ServiceAllowancePerpindahanRumahDetailDTO,
    ): string {
        return JSON.stringify(value);
    }
}
