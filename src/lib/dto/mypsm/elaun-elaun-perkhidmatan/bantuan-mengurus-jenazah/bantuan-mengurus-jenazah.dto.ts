export interface ServiceAllowanceBantuanMengurusJenazahDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    allowanceType: string;
    deathDate: string;
    deathTime: string;
    name: string;
    identityCardNumber: string;
    relationship: string;
}

// Converts JSON strings to/from your types
export class ServiceAllowanceBantuanMengurusJenazahDetailConvert {
    public static fromJson(
        json: string,
    ): ServiceAllowanceBantuanMengurusJenazahDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(
        value: ServiceAllowanceBantuanMengurusJenazahDetailDTO,
    ): string {
        return JSON.stringify(value);
    }
}
