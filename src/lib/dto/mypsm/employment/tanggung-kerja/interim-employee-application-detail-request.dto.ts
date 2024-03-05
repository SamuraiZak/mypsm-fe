export interface EmployeeInterimApplicationDetailRequestDTO {
    interimId: number;
}

// Converts JSON strings to/from your types
export class EmployeeInterimApplicationDetailRequestDTOConvert {
    public static fromJson(json: string): EmployeeInterimApplicationDetailRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: EmployeeInterimApplicationDetailRequestDTO): string {
        return JSON.stringify(value);
    }
}