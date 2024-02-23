export interface ApcAddDTO {
    employeeId: number;
    excellenceAwardYear: number;
}

// Converts JSON strings to/from your types
export class ApcAddConvert {
    public static fromJson(json: string): ApcAddDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ApcAddDTO): string {
        return JSON.stringify(value);
    }
}
