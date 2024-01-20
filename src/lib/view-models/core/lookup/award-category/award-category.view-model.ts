// ===============================================================
// Award Category Enum View Model
// ===============================================================

export interface EnumAwardCategoryReponse {
    status:  number;
    message: string;
    data:    EnumAwardCategoryData;
}

export interface EnumAwardCategoryData {
    awardCategories: AwardCategory[];
}

export interface AwardCategory {
    id:          string;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumAwardCategoryReponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumAwardCategoryReponse {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumAwardCategoryReponse {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumAwardCategoryReponse): string {
        return JSON.stringify(value);
    }
}