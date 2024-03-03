export interface CTRRequestDTO {
    startDate: Date;
    endDate: Date;
    untrackedLeaveType: string;
    reason: string;
    halfDayOption: boolean;
    halfDayType: string;
}

// Converts JSON strings to/from your types
export class CTRRequestConvert {
    public static fromJson(json: string): CTRRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: CTRRequestDTO): string {
        return JSON.stringify(value);
    }
}
