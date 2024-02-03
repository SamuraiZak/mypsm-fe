export interface AddSalaryMovementApprovalRequestDTO {
    id:         number;
    remark:     string;
    isApproved: boolean;
}

// Converts JSON strings to/from your types
export class AddSalaryMovementApprovalRequestDTOConvert {
    public static toAddSalaryMovementApprovalDTO(json: string): AddSalaryMovementApprovalRequestDTO {
        return JSON.parse(json);
    }

    public static addSalaryMovementApprovalDTOToJson(value: AddSalaryMovementApprovalRequestDTO): string {
        return JSON.stringify(value);
    }
}