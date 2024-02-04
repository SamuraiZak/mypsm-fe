export interface AddAPCResponseDTO {
    performanceID:       number;
    employeeName:        string;
    excellenceAwardYear: number;
}

// Converts JSON strings to/from your types
export class AddAPCResponseConvert {
    public static fromJson(json: string): AddAPCResponseDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddAPCResponseDTO): string {
        return JSON.stringify(value);
    }
}