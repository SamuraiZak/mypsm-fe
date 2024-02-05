export interface DetailSalaryMovementApprovalRequestDTO {
    meetingId: number;
}

// Converts JSON strings to/from your types
export class DetailSalaryMovementApprovalRequestDTOConvert {
    public static fromJson(json: string): DetailSalaryMovementApprovalRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: DetailSalaryMovementApprovalRequestDTO): string {
        return JSON.stringify(value);
    }
}