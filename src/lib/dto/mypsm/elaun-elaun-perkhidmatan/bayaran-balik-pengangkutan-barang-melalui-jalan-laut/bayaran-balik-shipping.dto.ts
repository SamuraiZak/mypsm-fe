export interface ServiceAllowanceBayaranBalikShippingDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    allowanceType: string;
    startDate: Date;
    endDate: Date;
    distance: number;
    reason: string;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceBayaranBalikShippingDetailConvert {
    public static fromJson(
        json: string,
    ): ServiceAllowanceBayaranBalikShippingDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(
        value: ServiceAllowanceBayaranBalikShippingDetailDTO,
    ): string {
        return JSON.stringify(value);
    }
}
