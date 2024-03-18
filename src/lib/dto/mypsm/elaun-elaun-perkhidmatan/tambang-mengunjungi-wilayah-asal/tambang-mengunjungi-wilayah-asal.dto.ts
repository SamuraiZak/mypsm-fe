import type { ServiceAllowanceFamilyDetailDTO } from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/shared/allowance-family-detail/service-allowance-family-detail.dto';

export interface ServiceAllowanceTambangMengunjungiWilayahAsalDetailDTO {
    allowanceId: number;
    allowanceTypeCode: string;
    allowanceType: string;
    applyCode: string;
    stateCode: string;
    familyDetail: ServiceAllowanceFamilyDetailDTO[];
}

// Converts JSON strings to/from your types
export class ServiceAllowanceTambangMengunjungiWilayahAsalDetailConvert {
    public static fromJson(
        json: string,
    ): ServiceAllowanceTambangMengunjungiWilayahAsalDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(
        value: ServiceAllowanceTambangMengunjungiWilayahAsalDetailDTO,
    ): string {
        return JSON.stringify(value);
    }
}
