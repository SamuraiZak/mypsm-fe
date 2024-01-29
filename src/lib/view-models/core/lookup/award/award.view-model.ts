// ===============================================================
// Award Category Enum View Model
// ===============================================================

export interface EnumAwardResponseViewModel {
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
    public static fromResponse(response: Response): EnumAwardResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumAwardResponseViewModel {
        return JSON.parse(json);
    }

    // to json string form model
    public static toJson(value: EnumAwardResponseViewModel): string {
        return JSON.stringify(value);
    }
}