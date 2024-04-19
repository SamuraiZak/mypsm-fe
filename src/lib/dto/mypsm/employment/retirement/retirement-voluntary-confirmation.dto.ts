export interface VoluntaryConfirmationDetailDTO {
    voluntaryId: number;
    status:      boolean;
    remark:      string;
}

// Converts JSON strings to/from your types
export class VoluntaryConfirmationDetailDTOConvert {
    public static fromJson(json: string): VoluntaryConfirmationDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: VoluntaryConfirmationDetailDTO): string {
        return JSON.stringify(value);
}
}