export interface AddSalaryMovementApprovalRequestDTO {
    id:     number;
    remark: string;
    status: boolean;
}

// Converts JSON strings to/from your types
export class AddSalaryMovementApprovalRequestDTOConvert {
    public static fromJson(json: string): AddSalaryMovementApprovalRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddSalaryMovementApprovalRequestDTO): string {
        return JSON.stringify(value);
    }
}