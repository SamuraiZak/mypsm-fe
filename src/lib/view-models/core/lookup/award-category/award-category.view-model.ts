// ===============================================================
// Award Category Enum View Model
// ===============================================================

export interface EnumAwardCategoryReponseViewModel {
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
    public static fromResponse(response: Response): EnumAwardCategoryReponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumAwardCategoryReponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumAwardCategoryReponseViewModel): string {
        return JSON.stringify(value);
    }
}