export interface ActingCommonList {
    batchId:        number;
    actingType:     string;
    date:           string;
    candidateCount: number;
    status:         string;
}

// Converts JSON strings to/from your types
export class ActingCommonListConvert {
    public static fromJson(json: string): ActingCommonList[] {
        return JSON.parse(json);
    }

    public static toJson(value: ActingCommonList[]): string {
        return JSON.stringify(value);
    }
}

export interface EmployeeActingOffer {
    actingId:      number;
    offerDate:     string | null;
    actingType:    string;
    grade:         string;
    position:      string;
    meetingResult: string;
}

// Converts JSON strings to/from your types
export class EmployeeActingOfferConvert {
    public static fromJson(json: string): EmployeeActingOffer[] {
        return JSON.parse(json);
    }

    public static toJson(value: EmployeeActingOffer[]): string {
        return JSON.stringify(value);
    }
}