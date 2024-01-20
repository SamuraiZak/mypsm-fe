// ===============================================================
// Award Category Enum View Model
// ===============================================================

export interface EnumAwardResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    awards: EnumAward[];
}

export interface EnumAward {
    id:          string;
    code:        string;
    description: string;
    category:    string;
    abbrevation: string;
}

// Converts JSON strings to/from your types
export class EnumAwardResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumAwardResponse {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumAwardResponse {
        return JSON.parse(json);
    }

    // to json string form model
    public static toJson(value: EnumAwardResponse): string {
        return JSON.stringify(value);
    }
}