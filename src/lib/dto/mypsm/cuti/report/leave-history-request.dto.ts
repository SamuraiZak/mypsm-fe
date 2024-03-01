export interface LeaveHistoryRequestDTO {
    employeeId: number | null;
    year: number;
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
