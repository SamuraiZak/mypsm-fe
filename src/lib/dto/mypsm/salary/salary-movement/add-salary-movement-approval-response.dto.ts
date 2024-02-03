export interface AddSalaryMovementApprovalResponseDTO {
    status: string;
}

// Converts JSON strings to/from your types
export class AddSalaryMovementApprovalResponseDTOConvert {
    public static toAddSalaryMovementApprovalResponseDTO(json: string): AddSalaryMovementApprovalResponseDTO {
        return JSON.parse(json);
    }

    public static addSalaryMovementApprovalResponseDTOToJson(value: AddSalaryMovementApprovalResponseDTO): string {
        return JSON.stringify(value);
    }
}