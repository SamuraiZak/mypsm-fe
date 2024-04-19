export interface SupportDetailDTO {
    supporterName:   string;
    supportedStatus: string;
    supportedRemark: string;
    supportedDate:   Date;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromJson(json: string): SupportDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: SupportDetailDTO): string {
        return JSON.stringify(value);
    }
}