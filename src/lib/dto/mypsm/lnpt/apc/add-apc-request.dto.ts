export interface AddAPCRequestDTO {
    employeeName:        string;
    excellenceAwardYear: number;
}

// Converts JSON strings to/from your types
export class AddAPCRequestConvert {
    public static fromJson(json: string): AddAPCRequestDTO {
        return JSON.parse(json);
    }

    public static addAPCRequestDTOToJson(value: AddAPCRequestDTO): string {
        return JSON.stringify(value);
    }
}