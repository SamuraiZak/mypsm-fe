export interface ActingConfirmationDetail {
    candidate:    ActingCandidate | null;
    actingDetail: ActingDetail | null;
    confirmation: Confirmation | null;
}

export interface ActingDetail {
    newPosition:  string;
    newGrade:     string;
    newPlacement: string;
    newDirector:  string;
    reportDate:   string;
}

export interface ActingCandidate {
    employeeId:     string;
    employeeNumber: string;
    employeeName:   string;
    ICNumber:       string;
}

export interface Confirmation {
    supporterName:   string;
    supporterResult: string;
    approverName:    string;
    approverResult:  string;
}

// Converts JSON strings to/from your types
export class ActingConfirmationDetailConvert {
    public static fromJson(json: string): ActingConfirmationDetail {
        return JSON.parse(json);
    }

    public static toJson(value: ActingConfirmationDetail): string {
        return JSON.stringify(value);
    }
}