// =================================================================
// Service Allowance List Response View Model
// =================================================================

export interface AllowanceRecordListResponseViewModel {
    status:  number;
    message: string;
    data:    AllowanceRecordListResponseData;
}

export interface AllowanceRecordListResponseData {
    pageNum:             number;
    totalData:           number;
    totalPage:           number;
    allowanceRecordList: AllowanceRecordList[];
}

export interface AllowanceRecordList {
    recordID:           string;
    employeeNumber:     string;
    employeeName:       string;
    identityCardNumber: string;
    allowanceType:      string;
    applicationDate:    string;
    approvalDate:       string;
    status:             string;
    remarks:            string;
}

// Converts JSON strings to/from your types
export class AllowanceRecordListResponseConvert {

    // to model from response
    public static fromResponse(response: Response): AllowanceRecordListResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): AllowanceRecordListResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: AllowanceRecordListResponseViewModel): string {
        return JSON.stringify(value);
    }
}