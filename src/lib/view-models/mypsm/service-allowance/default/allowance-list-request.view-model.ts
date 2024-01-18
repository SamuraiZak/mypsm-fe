// =================================================================
// Service Allowance List Response DTO
// =================================================================

export interface AllowanceRecordListRequestViewModel {
    pageNum:   number;
    pageSize:  number;
    orderBy:   string;
    orderType: string;
    filter:    AllowanceRecordListRequestFilter;
}

export interface AllowanceRecordListRequestFilter {
    employeeNumber:             null;
    employeeName:               null;
    employeeIdentityCardNumber: null;
    allowanceType:              null;
    applicationDate:            null;
    status:                     null;
}

// Converts JSON strings to/from your types
export class AllowanceRecordListRequestConvert {

    // to model from response
    public static fromResponse(response: Response): AllowanceRecordListRequestViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): AllowanceRecordListRequestViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: AllowanceRecordListRequestViewModel): string {
        return JSON.stringify(value);
    }
}
