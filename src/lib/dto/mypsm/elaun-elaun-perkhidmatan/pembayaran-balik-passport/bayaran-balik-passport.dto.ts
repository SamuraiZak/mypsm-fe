export interface ServiceAllowanceBayaranBalikPassportDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    allowanceType: string;
    renewDate: Date;
    reason: string;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceBayaranBalikPassportDetailConvert {
    public static fromJson(
        json: string,
    ): ServiceAllowanceBayaranBalikPassportDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(
        value: ServiceAllowanceBayaranBalikPassportDetailDTO,
    ): string {
        return JSON.stringify(value);
    }
}
