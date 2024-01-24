// ===============================================================
// ID Type Enum Response View Model
// ===============================================================

export interface EnumLoginIDTypeResponseViewModel {
    status:  number;
    message: string;
    data:    EnumLoginIDTypeResponseData;
}

export interface EnumLoginIDTypeResponseData {
    idTypeList: string[];
}

// Converts JSON strings to/from your types
export class EnumLoginIDTypeResponseConvert {
    // to model form json string
    public static fromResponse(response: Response): EnumLoginIDTypeResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model form json string
    public static fromJson(json: string): EnumLoginIDTypeResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: EnumLoginIDTypeResponseViewModel): string {
        return JSON.stringify(value);
    }
}