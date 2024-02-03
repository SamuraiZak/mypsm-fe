export interface GetSalaryMovementScheduleDTO {
    employeeNo:         string;
    employeeName:       string;
    salaryMovementDate: Date;
    newSalary:          number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toGetSalaryMovementScheduleDTO(json: string): GetSalaryMovementScheduleDTO {
        return JSON.parse(json);
    }

    public static getSalaryMovementScheduleDTOToJson(value: GetSalaryMovementScheduleDTO): string {
        return JSON.stringify(value);
    }
}
