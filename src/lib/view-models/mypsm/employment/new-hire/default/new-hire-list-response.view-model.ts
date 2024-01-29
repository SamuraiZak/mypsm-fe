// =================================================================
// Employee List Response View Model
// =================================================================

export interface NewHireListResponseViewModel {
    status:  number;
    message: string;
    data:    NewHireListResponseData;
}

export interface NewHireListResponseData {
    pageNum:   number;
    totalData: number;
    totalPage: number;
    newHires:  NewHireItem[];
}

export interface NewHireItem {
    candidateID:    string;
    candidateName:  string;
    temporaryID:    string;
    identityCardNo: string;
    email:          string;
}

// Converts JSON strings to/from your types
export class NewHireListResponseConvert {

    // to model from response
    public static fromResponse(response: Response): NewHireListResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): NewHireListResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: NewHireListResponseViewModel): string {
        return JSON.stringify(value);
    }
}