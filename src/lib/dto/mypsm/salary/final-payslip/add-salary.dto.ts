export interface AddSalaryDTO {
    employeeId: number;
    status:     boolean;
}

// Converts JSON strings to/from your types
export class AddSalaryDTOConvert {
    public static toAddSalaryDTO(json: string): AddSalaryDTO {
        return JSON.parse(json);
    }

    public static addSalaryDTOToJson(value: AddSalaryDTO): string {
        return JSON.stringify(value);
    }
}