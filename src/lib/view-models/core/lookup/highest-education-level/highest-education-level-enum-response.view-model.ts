// ===============================================================
// Highest Education Level Enum Response View Model
// ===============================================================

export interface EnumEducationLevelResponseViewModel {
    status:  number;
    message: string;
    data:    EnumEducationLevelResponseData;
}

export interface EnumEducationLevelResponseData {
    highestEducationLevels: EnumHighestEducationLevel[];
}

export interface EnumHighestEducationLevel {
    id:          number;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumEducationLevelResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumEducationLevelResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumEducationLevelResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumEducationLevelResponseViewModel): string {
        return JSON.stringify(value);
    }
}