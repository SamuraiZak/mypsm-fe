// ===============================================================
// City Enum View Model
// ===============================================================

export interface EnumCityResponseViewModel {
    status:  number;
    message: string;
    data:    EnumCityResponseData;
}

export interface EnumCityResponseData {
    cities: EnumCity[];
}

export interface EnumCity {
    id:          string;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumCityResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumCityResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumCityResponseViewModel {
        return JSON.parse(json);
    }
    
    // to json string from model
    public static enumCityResponseToJson(value: EnumCityResponseViewModel): string {
        return JSON.stringify(value);
    }
}