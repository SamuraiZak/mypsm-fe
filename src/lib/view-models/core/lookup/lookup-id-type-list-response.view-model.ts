// ===============================================================
// Lookup Id Type List Response View Model
// ===============================================================

export interface IDTypeListResponseViewModel {
    status:  number;
    message: string;
    data:    IDTypeListData;
}

export interface IDTypeListData {
    idTypeList: string[];
}

// Converts JSON strings to/from your types
export class IDTypeListConvert {

    // to model from response
    public static fromResponse(response: Response): IDTypeListResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): IDTypeListResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: IDTypeListResponseViewModel): string {
        return JSON.stringify(value);
    }
}