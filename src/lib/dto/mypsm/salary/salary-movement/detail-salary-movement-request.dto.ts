export interface DetailSalaryMovementRequestDTO {
    meetingId: number;
}

// Converts JSON strings to/from your types
export class DetailSalaryMovementRequestDTOConvert {
    public static fromJson(json: string): DetailSalaryMovementRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: DetailSalaryMovementRequestDTO): string {
        return JSON.stringify(value);
    }
}