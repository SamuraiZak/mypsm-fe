export interface EmployeeDetailRequestDTO {
    employeeNumber: string;
}

// Converts JSON strings to/from your types
export class EmployeeDetailRequestConvert {
    public static fromJson(json: string): EmployeeDetailRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: EmployeeDetailRequestDTO): string {
        return JSON.stringify(value);
    }
}
