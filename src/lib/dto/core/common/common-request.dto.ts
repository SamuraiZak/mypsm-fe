export interface CommonRequestDTO {
    id?: number;
}

// Converts JSON strings to/from your types
export class CommonRequestConvert {
    public static fromJson(json: string): CommonRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: CommonRequestDTO): string {
        return JSON.stringify(value);
    }
}