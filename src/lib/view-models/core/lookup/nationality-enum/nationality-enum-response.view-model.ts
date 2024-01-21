// ===============================================================
// Nationality Enum Response View Model
// ===============================================================

export interface EnumNationalityResponseViewModel {
    status:  number;
    message: string;
    data:    EnumNationalityResponseData;
}

export interface EnumNationalityResponseData {
    nationalities: EnumNationality[];
}

export interface EnumNationality {
    id:          number;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumNationalityResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumNationalityResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumNationalityResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumNationalityResponseViewModel): string {
        return JSON.stringify(value);
    }
}