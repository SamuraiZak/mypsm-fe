// =================================================================
// Leave History List Response View Model
// =================================================================

export interface LeaveHistoryListResponseViewModel {
    status:  number;
    message: string;
    data:    LeaveHistoryListResponseData;
}

export interface LeaveHistoryListResponseData {
    currentPageSIze: number;
    pageNum:         number;
    totalPage:       number;
    totalData:       number;
    dataList:        LeaveHistoryItem[];
}

export interface LeaveHistoryItem {
    employeeName: string;
    leaveType:    string;
    leaveFrom:    Date;
    leaveTo:      Date;
    leaveTotal:   number;
    status:       null;
    reason:       null;
}

// Converts JSON strings to/from your types
export class LeaveHistoryListResponseConvert {

    // to model from json string
    public static fromResponse(response: Response): LeaveHistoryListResponseViewModel {
        return JSON.parse(JSON.stringify(response));
    }

    // to model from json string
    public static fromJson(json: string): LeaveHistoryListResponseViewModel {
        return JSON.parse(json);
    }

    // to json string from model
    public static leaveHistoryListResponseViewModelToJson(value: LeaveHistoryListResponseViewModel): string {
        return JSON.stringify(value);
    }
}