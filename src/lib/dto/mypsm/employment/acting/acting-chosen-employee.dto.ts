export interface ActingChosenEmployee {
    actingId:         number;
    employeeId?:       number;
    employeeNumber:   string;
    employeeName:     string;
    ICNumber:         string;
    programme?:        string;
    scheme?:           string;
    grade?:            string;
    position?:         string;
    currentPlacement?: string;
    selectionResult?: string;
    disciplinaryReview?: string;
    assetDeclaration?: string;
    secretariatStatus?: string;
    directorStatus?:    string;
    meetingResult?:     string;
    promotionMeetingResult?: string | null;
    placementMeetingResult?: string;
    postponeApplication?:      string;
    postponeResult?: string;
    actingResult?:   string;
    propertyDeclaration?: string;
    certificateOfIntegrity?: string;
    marks?: number;
}

// Converts JSON strings to/from your types
export class ActingChosenEmployeeConvert {
    public static fromJson(json: string): ActingChosenEmployee[] {
        return JSON.parse(json);
    }

    public static toJson(value: ActingChosenEmployee[]): string {
        return JSON.stringify(value);
    }
}

export interface EmployeePromotionDetail {
    candidate:     Candidate;
    meetingResult: string;
}

export interface Candidate {
    employeeNumber: string;
    employeeName:   string;
    ICNumber:       string;
}

// Converts JSON strings to/from your types
export class EmployeePromotionDetailConvert {
    public static fromJson(json: string): EmployeePromotionDetail {
        return JSON.parse(json);
    }

    public static toJson(value: EmployeePromotionDetail): string {
        return JSON.stringify(value);
    }
}

interface ActingDocs {
    name: string;
    document: string;
}

export interface PostponeDetail {
    postponeNeeded:      string;
    initialReportDate:   string;
    initialPlacement:    string;
    requestedReportDate: string | null;
    requestedPlacement:  string;
    meetingResult:       string;
    newReportDutyDate:   string;
    newPlacement:        string;
    documents:           ActingDocs[];  
}

// Converts JSON strings to/from your types
export class PostponeDetailConvert {
    public static fromJson(json: string): PostponeDetail {
        return JSON.parse(json);
    }

    public static toJson(value: PostponeDetail): string {
        return JSON.stringify(value);
    }
}