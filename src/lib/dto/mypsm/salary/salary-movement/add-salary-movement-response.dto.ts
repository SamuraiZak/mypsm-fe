export interface AddSalaryMovementResponseDTO {
    status: string;
}

// Converts JSON strings to/from your types
export class AddSalaryMovementResponseDTOConvert {
    public static toAddSalaryMovementResponseDTO(json: string): AddSalaryMovementResponseDTO {
        return JSON.parse(json);
    }

    public static addSalaryMovementResponseDTOToJson(value: AddSalaryMovementResponseDTO): string {
        return JSON.stringify(value);
    }
}