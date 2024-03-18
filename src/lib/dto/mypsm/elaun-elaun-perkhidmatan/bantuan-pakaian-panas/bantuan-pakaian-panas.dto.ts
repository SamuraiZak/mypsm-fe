export interface ServiceAllowanceBantuanPakaianPanasDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    allowanceType: string;
    reason: string;
    personal: number;
    partner: number;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceBantuanPakaianPanasDetailConvert {
    public static fromJson(
        json: string,
    ): ServiceAllowanceBantuanPakaianPanasDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(
        value: ServiceAllowanceBantuanPakaianPanasDetailDTO,
    ): string {
        return JSON.stringify(value);
    }
}
