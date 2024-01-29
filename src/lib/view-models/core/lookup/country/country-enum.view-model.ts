
// ===============================================================
// Country Enum Response View Model
// ===============================================================

export interface EnumCountryResponseViewModel {
    status:  number;
    message: string;
    data:    EnumCountryResponseData;
}

export interface EnumCountryResponseData {
    countries: EnumCountry[];
}

export interface EnumCountry {
    id:          string;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumCountryResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumCountryResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumCountryResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumCountryResponseViewModel): string {
        return JSON.stringify(value);
    }
}