export interface UpdateMainPromotionMeeting {
    batchId:        number;
    actingPosition: string;
    actingGrade:    string;
    placement:      string;
    meetingName:    string;
    referenceTitle: string;
    referenceNo:    string;
    referenceDate:  string;
    reportDate:     string;
}

// Converts JSON strings to/from your types
export class UpdateMainPromotionMeetingConvert {
    public static fromJson(json: string): UpdateMainPromotionMeeting {
        return JSON.parse(json);
    }

    public static toJson(value: UpdateMainPromotionMeeting): string {
        return JSON.stringify(value);
    }
}