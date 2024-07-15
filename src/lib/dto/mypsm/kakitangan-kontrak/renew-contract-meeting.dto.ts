export interface RenewContractMeeting {
    id?:        number;
    name?:       string;
    remark:     string;
    status:     boolean;
    // meetingName:       string;
    // meetingDate:       string;
    isDraft: boolean;
    isReadonly?: boolean;
}

// Converts JSON strings to/from your types
export class RenewContractMeetingConvert {
    public static fromJson(json: string): RenewContractMeeting {
        return JSON.parse(json);
    }

    public static toJson(value: RenewContractMeeting): string {
        return JSON.stringify(value);
    }
}
