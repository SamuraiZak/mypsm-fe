// ===============================================================
// Ethnicity Enum Response View Model
// ===============================================================

export interface EnumEthnicityResponseViewModel {
    status:  number;
    message: string;
    data:    EnumEthnicityResponseData;
}

export interface EnumEthnicityResponseData {
    ethnicities: EnumEthnicity[];
}

export interface EnumEthnicity {
    id:          number;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumEthnicityResponseConvert {

    // to model from json string
    public static fromResponse(response: Response): EnumEthnicityResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumEthnicityResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumEthnicityResponseViewModel): string {
        return JSON.stringify(value);
    }
}