export interface FirstSupporterDetailDTO {
    voluntaryId: number;
    status:      boolean;
    remark:      string;
    isReadOnly:  boolean;
}

// Converts JSON strings to/from your types
export class FirstSupporterDetailDTOConvert {
    public static fromJson(json: string): FirstSupporterDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: FirstSupporterDetailDTO): string {
        return JSON.stringify(value);
}
}