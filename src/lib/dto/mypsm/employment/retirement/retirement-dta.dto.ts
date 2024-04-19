export interface RetirementDateDetailDTO {
    retirementDatee: Date;
}

// Converts JSON strings to/from your types
export class RetirementDateDetailDTOConvert {
    public static fromJson(json: string): RetirementDateDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: RetirementDateDetailDTO): string {
        return JSON.stringify(value);
}
}
