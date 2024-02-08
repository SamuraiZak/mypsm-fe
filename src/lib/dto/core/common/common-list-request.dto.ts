// ===============================================================
// Common List Request DTO
// ===============================================================

export interface CommonListRequestDTO {
    pageNum?: number;
    pageSize?: number;
    orderBy?: string;
    orderType?: string;
    filter?: any;
}

// Converts JSON strings to/from your types
export class CommonListRequestConvert {
    // to model from json string
    public static fromJson(json: string): CommonListRequestDTO {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: CommonListRequestDTO): string {
        return JSON.stringify(value);
    }
}