export interface UpdatePromotionMeeting {
    batchId:        number;
    actingGrade:    string;
    meetingName:    string;
    meetingDate:    string;
}

// Converts JSON strings to/from your types
export class UpdatePromotionMeetingConvert {
    public static fromjson(json: string): UpdatePromotionMeeting {
        return JSON.parse(json);
    }

    public static toJson(value: UpdatePromotionMeeting): string {
        return JSON.stringify(value);
    }
}

export interface PromotionMeetingResult {
    id:             number;
    meetingResult:  string;
}

// Converts JSON strings to/from your types
export class PromotionMeetingResultConvert {
    public static fromjson(json: string): PromotionMeetingResult {
        return JSON.parse(json);
    }

    public static toJson(value: PromotionMeetingResult): string {
        return JSON.stringify(value);
    }
}

export interface PlacementMeetingDetail {
    batchId?:     number;
    meetingName: string;
    meetingDate: string;
    meetingId?: number;
}

// Converts JSON strings to/from your types
export class PlacementMeetingDetailConvert {
    public static fromJson(json: string): PlacementMeetingDetail {
        return JSON.parse(json);
    }

    public static toJson(value: PlacementMeetingDetail): string {
        return JSON.stringify(value);
    }
}

export interface PlacementResult {
    id:            number;
    meetingResult: string;
    newPlacement:  string | null;
    reportDate:    string | null;
    newDirector:   string | null;
}

// Converts JSON strings to/from your types
export class PlacementResultConvert {
    public static fromJson(json: string): PlacementResult {
        return JSON.parse(json);
    }

    public static toJson(value: PlacementResult): string {
        return JSON.stringify(value);
    }
}

