export interface LeaveHistoryRequestDTO {
    year:         number;
    employeeId?:   number | null;
    identityCard?: string | null;
    staffNo?:      string | null;
    staffName?:    string | null;
    position?:     string | null;
    status?:       string | null;
}

// Converts JSON strings to/from your types
export class LeaveHistoryRequestConvert {
    public static fromJson(
        json: string,
    ): LeaveHistoryRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(
        value: LeaveHistoryRequestDTO,
    ): string {
        return JSON.stringify(value);
    }
}
