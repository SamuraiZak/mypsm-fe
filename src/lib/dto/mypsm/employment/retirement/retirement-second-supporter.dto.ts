export interface SecondSupporterDetailDTO {
    voluntaryId: number;
    status:      boolean;
    remark:      string;
    isReadOnly:  boolean;
}

// Converts JSON strings to/from your types
export class SecondSupporterDetailDTOConvert {
    public static fromJson(json: string): SecondSupporterDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: SecondSupporterDetailDTO): string {
        return JSON.stringify(value);
}
}