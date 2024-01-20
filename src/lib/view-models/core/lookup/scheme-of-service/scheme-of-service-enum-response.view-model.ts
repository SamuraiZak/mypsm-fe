// ===============================================================
// Scheme of Service Enum Response View Model
// ===============================================================

export interface EnumSchemeOfServiceResponseViewModel {
    status:  number;
    message: string;
    data:    EnumSchemeOfServiceResponseData;
}

export interface EnumSchemeOfServiceResponseData {
    schemeOfServices: EnumSchemeOfService[];
}

export interface EnumSchemeOfService {
    id:           number;
    code:         string;
    description:  string;
    serviceClass: string;
}

// Converts JSON strings to/from your types
export class EnumSchemeOfServiceResponseConvert {

    // to model from json string
    public static fromResponse(response: Response): EnumSchemeOfServiceResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumSchemeOfServiceResponseViewModel {
        return JSON.parse(json);
    }

    // to jsons tring from model
    public static toJson(value: EnumSchemeOfServiceResponseViewModel): string {
        return JSON.stringify(value);
    }
}