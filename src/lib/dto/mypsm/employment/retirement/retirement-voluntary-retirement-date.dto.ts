export interface VoluntaryRetirementDateDetailDTO {
    retirementDatee: Date;
}

// Converts JSON strings to/from your types
export class VoluntaryRetirementDateDetailDTOConvert {
    public static fromJson(json: string): VoluntaryRetirementDateDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: VoluntaryRetirementDateDetailDTO): string {
        return JSON.stringify(value);
}
}