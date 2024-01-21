// ===============================================================
// Religion Enum Response View Model
// ===============================================================

export interface EnumReligionResponseViewModel {
    status:  number;
    message: string;
    data:    EnumReligionResponseData;
}

export interface EnumReligionResponseData {
    religions: EnumReligion[];
}

export interface EnumReligion {
    id:          number;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumReligionResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumReligionResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumReligionResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumReligionResponseViewModel): string {
        return JSON.stringify(value);
    }
}