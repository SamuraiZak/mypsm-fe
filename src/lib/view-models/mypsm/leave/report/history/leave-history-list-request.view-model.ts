// =================================================================
// Leave History List Request View Model
// =================================================================

export interface LeaveHistoryListRequestViewModel {
    pageNum:   number;
    pageSize:  number;
    orderBy:   string;
    orderType: string;
}

// Converts JSON strings to/from your types
export class LeaveHistoryListRequestConvert {

    // to model from json string
    public static fromJson(json: string): LeaveHistoryListRequestViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static toJson(value: LeaveHistoryListRequestViewModel): string {
        return JSON.stringify(value);
    }
}