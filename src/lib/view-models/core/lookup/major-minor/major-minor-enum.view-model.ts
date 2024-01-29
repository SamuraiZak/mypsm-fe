// ===============================================================
// Major Minor Enum Response View Model
// ===============================================================

export interface EnumMajorMinorResponseViewModel {
    status: number;
    message: string;
    data: EnumMajorMinorResponseData;
}

export interface EnumMajorMinorResponseData {
    majorMinors: MajorMinor[];
}

export interface MajorMinor {
    id: number;
    code: string;
    description: string;
}

// Converts JSON strings to/from your types
export class EnumCountryResponseConvert {
    // to model from response
    public static fromResponse(response: Response): EnumMajorMinorResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): EnumMajorMinorResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumMajorMinorResponseViewModel): string {
        return JSON.stringify(value);
    }
}
