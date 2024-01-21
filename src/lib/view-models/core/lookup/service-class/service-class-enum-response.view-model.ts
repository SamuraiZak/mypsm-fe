// ===============================================================
// Service Class Enum Response View Model
// ===============================================================

export interface EnumServiceClassResponseViewModel {
    status:  number;
    message: string;
    data:    EnumServiceClassResponseData;
}

export interface EnumServiceClassResponseData {
    serviceClass: EnumServiceClass[];
}

export interface EnumServiceClass {
    id:          number;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumServiceClassResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumServiceClassResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static toEnumServiceClassResponseViewModel(json: string): EnumServiceClassResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static enumServiceClassResponseViewModelToJson(value: EnumServiceClassResponseViewModel): string {
        return JSON.stringify(value);
    }
}
