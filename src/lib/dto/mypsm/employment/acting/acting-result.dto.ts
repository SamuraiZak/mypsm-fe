export interface ActingResult {
    candidate:     Candidate;
    actingDetails: ActingDetails;
    confirmation:  Confirmation;
}

export interface ActingDetails {
    actingId?:       number;
    id?:            number;
    actingResult:   string;
    actingPosition: string;
    actingGrade:    string;
    newPlacement:   string;
    reportDate:     string;
    supporterName?: string;
    approverName?:  string;
}

export interface Candidate {
    employeeId:     number;
    employeeNumber: string;
    employeeName:   string;
    ICNumber:       string;
}

export interface Confirmation {
    supporterName: string;
    approverName:  string;
}

// Converts JSON strings to/from your types
export class ActingResultConvert {
    public static fromJson(json: string): ActingResult {
        return JSON.parse(json);
    }

    public static toJson(value: ActingResult): string {
        return JSON.stringify(value);
    }
}
export class ActingDetailsConvert {
    public static fromJson(json: string): ActingDetails {
        return JSON.parse(json);
    }

    public static toJson(value: ActingDetails): string {
        return JSON.stringify(value);
    }
}