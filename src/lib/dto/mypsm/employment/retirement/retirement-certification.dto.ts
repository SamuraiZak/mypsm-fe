export interface CertificationDetailDTO {
    forceId: number;
    status:  boolean;
    remark:  string;
}

// Converts JSON strings to/from your types
export class CertificationDetailDTOConvert {
    public static fromJson(json: string): CertificationDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: CertificationDetailDTO): string {
        return JSON.stringify(value);
    }
}
