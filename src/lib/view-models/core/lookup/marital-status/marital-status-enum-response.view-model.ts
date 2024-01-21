// ===============================================================
// Marital Status Enum Response View Model
// ===============================================================

export interface EnumMaritalStatusResponseViewModel {
    status:  number;
    message: string;
    data:    EnumMaritalStatusResponseData;
}

export interface EnumMaritalStatusResponseData {
    maritalStatus: EnumMaritalStatus[];
}

export interface EnumMaritalStatus {
    id:          number;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumMaritalStatusResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumMaritalStatusResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumMaritalStatusResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumMaritalStatusResponseViewModel): string {
        return JSON.stringify(value);
    }
}