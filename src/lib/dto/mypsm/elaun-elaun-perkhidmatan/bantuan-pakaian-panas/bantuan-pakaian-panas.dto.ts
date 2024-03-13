export interface ServiceAllowanceBantuanPakaianIstiadatDetailDTO {
    allowanceID: number;
    allowanceTypeCode: string;
    allowanceType: string;
    reason: string;
    personal: number;
    partner: number;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceBantuanPakaianIstiadatDetailConvert {
    public static fromJson(
        json: string,
    ): ServiceAllowanceBantuanPakaianIstiadatDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(
        value: ServiceAllowanceBantuanPakaianIstiadatDetailDTO,
    ): string {
        return JSON.stringify(value);
    }
}
