export interface ForceStatusDetailDTO {
    forcedId: number;
    status:      boolean;
    remark:      string;
}

// Converts JSON strings to/from your types
export class ForceStatusDetailDTOConvert {
    public static fromJson(json: string): ForceStatusDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ForceStatusDetailDTO): string {
        return JSON.stringify(value);
}
}