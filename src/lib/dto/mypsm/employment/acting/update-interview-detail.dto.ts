export interface UpdateActingInterview {
    batchId:       number;
    grade:         string;
    position:      string;
    meetingName:   string;
    meetingDate:   string;
    state:         string;
    placement:     string;
    interviewDate: string;
    interviewTime: string;
}

// Converts JSON strings to/from your types
export class UpdateActingInterviewConvert {
    public static fromJson(json: string): UpdateActingInterview {
        return JSON.parse(json);
    }

    public static toJson(value: UpdateActingInterview): string {
        return JSON.stringify(value);
    }
}