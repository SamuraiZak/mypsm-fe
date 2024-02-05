export interface GetSalaryMovementScheduleRequestDTO {
    meetingId: number;
}

// Converts JSON strings to/from your types
export class GetSalaryMovementScheduleRequestDTOConvert {
    public static fromJson(json: string): GetSalaryMovementScheduleRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: GetSalaryMovementScheduleRequestDTO): string {
        return JSON.stringify(value);
    }
}