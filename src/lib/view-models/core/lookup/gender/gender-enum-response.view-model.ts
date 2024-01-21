// ===============================================================
// Gender Enum Response View Model
// ===============================================================

export interface EnumGenderResponseViewModel {
    status:  number;
    message: string;
    data:    EnumGenderResponseData;
}

export interface EnumGenderResponseData {
    genders: EnumGender[];
}

export interface EnumGender {
    id:          number;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumGenderResponseConvert {

    // to model from json string
    public static fromResponse(response: Response): EnumGenderResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumGenderResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumGenderResponseViewModel): string {
        return JSON.stringify(value);
    }
}