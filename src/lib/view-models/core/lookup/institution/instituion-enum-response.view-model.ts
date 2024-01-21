// ===============================================================
// Institution Enum Response View Model
// ===============================================================

export interface EnumInstituionResponseViewModel {
    status:  number;
    message: string;
    data:    EnumInstituionResponseData;
}

export interface EnumInstituionResponseData {
    institutions: EnumInstitution[];
}

export interface EnumInstitution {
    id:          number;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumInstituionResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumInstituionResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumInstituionResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumInstituionResponseViewModel): string {
        return JSON.stringify(value);
    }
}