export interface LeaveHistoryDTO {
    employeeID:   number;
    leaveID:      number;
    employeeName: string;
    leaveType:    string;
    leaveFrom:    Date;
    leaveTo:      Date;
    leaveTotal:   number;
    status?:       string;
    reason?:       string;
    submittedOn:  Date;
}

// Converts JSON strings to/from your types
export class LeaveHistoryConvert {
    public static fromJson(json: string): LeaveHistoryDTO {
        return JSON.parse(json);
    }

    public static toJson(value: LeaveHistoryDTO): string {
        return JSON.stringify(value);
    }
}