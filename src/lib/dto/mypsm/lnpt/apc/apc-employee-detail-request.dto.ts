export interface APCEmployeeDetailRequestDTO {
    id: number;
}

// Converts JSON strings to/from your types
export class APCEmployeeDetailRequestConvert {
    public static fromJson(json: string): APCEmployeeDetailRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: APCEmployeeDetailRequestDTO): string {
        return JSON.stringify(value);
    }
}