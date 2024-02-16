// ===============================================================
// Lookup DTO
// ===============================================================

export interface LookupDTO {
    id?:          number;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class LookupConvert {
    // to model from json string
    public static fromJson(json: string): LookupDTO {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: LookupDTO): string {
        return JSON.stringify(value);
    }
}