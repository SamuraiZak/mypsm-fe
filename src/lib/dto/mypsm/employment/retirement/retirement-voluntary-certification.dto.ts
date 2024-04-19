export interface VoluntaryCertificationDetailDTO {
    voluntaryId: number;
    status:      boolean;
    remark:      string;
}

// Converts JSON strings to/from your types
export class VoluntaryCertificationDetailDTOConvert {
    public static fromJson(json: string): VoluntaryCertificationDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: VoluntaryCertificationDetailDTO): string {
        return JSON.stringify(value);
}
}