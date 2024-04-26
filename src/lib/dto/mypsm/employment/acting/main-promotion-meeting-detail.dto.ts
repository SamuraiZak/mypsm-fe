export interface MainPromotionMeeting {
    candidate:              Candidate;
    promotionMeetingResult: boolean | null;
}

export interface Candidate {
    employeeId:             number;
    employeeNumber:         string;
    employeeName:           string;
    ICNumber:               string;
    programme:              string;
    scheme:                 string;
    grade:                  string;
    position:               string;
    currentPlacement:       string;
    serviceGroup:           string;
    institutionLoanAccount: string;
}

// Converts JSON strings to/from your types
export class CandidateConvert {
    public static toMainPromotionMeeting(json: string): MainPromotionMeeting {
        return JSON.parse(json);
    }

    public static mainPromotionMeetingToJson(value: MainPromotionMeeting): string {
        return JSON.stringify(value);
    }
}