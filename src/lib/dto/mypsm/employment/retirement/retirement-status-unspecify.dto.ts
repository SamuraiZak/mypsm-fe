export interface UnspecifyStatusDetailDTO {
    id: number;
    status: boolean;
    remark: string;
}

// Converts JSON strings to/from your types
export class UnspecifyStatusDetailDTOConvert {
    public static fromJson(json: string): UnspecifyStatusDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: UnspecifyStatusDetailDTO): string {
        return JSON.stringify(value);
    }
}