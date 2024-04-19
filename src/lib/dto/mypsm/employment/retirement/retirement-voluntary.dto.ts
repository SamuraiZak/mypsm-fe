export interface VoluntaryDetailDTO {
    voluntaryId:       number;
    retirementDate:    Date;
    newRetirementDate: Date;
    reason:            string;
}

// Converts JSON strings to/from your types
export class VoluntaryDetailDTOConvert {
    public static fromJson(json: string): VoluntaryDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: VoluntaryDetailDTO): string {
        return JSON.stringify(value);
}
}