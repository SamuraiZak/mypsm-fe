// ===============================================================
// Lookup Allowance Type Response View Model
// ===============================================================

export interface AllowanceTypeListResponseViewModel {
    status:  number;
    message: string;
    data:    AllowanceTypeListData;
}

export interface AllowanceTypeListData {
    allowanceTypeList: string[];
}

// Converts JSON strings to/from your types
export class AllowanceTypeListConvert {

    // to model from response
    public static fromResponse(response: Response): AllowanceTypeListResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): AllowanceTypeListResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: AllowanceTypeListResponseViewModel): string {
        return JSON.stringify(value);
    }
}