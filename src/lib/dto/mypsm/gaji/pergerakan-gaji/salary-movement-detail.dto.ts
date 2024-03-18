export interface SalaryMovementDetail {
    meetingId:           string;
    meetingName:         string;
    meetingDate:         Date;
    salaryMovementMonth: number;
    specialAid:          number;
    specialRaiseType:    string;
    specialRaise:        number;
}

// Converts JSON strings to/from your types
export class SalaryMovementDetailConvert {
    public static fromJson(json: string): SalaryMovementDetail {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryMovementDetail): string {
        return JSON.stringify(value);
    }
}