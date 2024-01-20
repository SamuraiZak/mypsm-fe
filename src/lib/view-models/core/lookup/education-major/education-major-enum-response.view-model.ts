// ===============================================================
// Education Major Enum Response View Model
// ===============================================================

export interface EnumEducationMajorResponseViewModel {
    status:  number;
    message: string;
    data:    EnumEducationMajorResponseData;
}

export interface EnumEducationMajorResponseData {
    majorMinors: EnumMajorMinor[];
}

export interface EnumMajorMinor {
    id:          number;
    code:        string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumEducationMajorResponseConvert {

    // to model from response
    public static fromResponse(response: Response): EnumEducationMajorResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json
    public static fromJson(json: string): EnumEducationMajorResponseViewModel {
        return JSON.parse(json);
    }

    // to jsons tring form model
    public static toJson(value: EnumEducationMajorResponseViewModel): string {
        return JSON.stringify(value);
    }
}