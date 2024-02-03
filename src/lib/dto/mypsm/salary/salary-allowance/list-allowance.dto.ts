export interface ListAllowanceDTO {
    employeeId:      number;
    employeeName:    string;
    baseSalary:      number;
    allowance:       number;
    salaryDeduction: number;
    status:          string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toListAllowanceDTO(json: string): ListAllowanceDTO {
        return JSON.parse(json);
    }

    public static listAllowanceDTOToJson(value: ListAllowanceDTO): string {
        return JSON.stringify(value);
    }
}