export interface VoluntaryStatusDetailDTO {
    voluntaryId: number;
    status:      boolean;
    remark:      string;
}

// Converts JSON strings to/from your types
export class VoluntaryStatusDetailDTOConvert {
    public static fromJson(json: string): VoluntaryStatusDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: VoluntaryStatusDetailDTO): string {
        return JSON.stringify(value);
}
}