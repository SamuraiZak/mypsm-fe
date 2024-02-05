export interface GetSalaryMovementScheduleDTO {
    employeeNo:         string;
    employeeName:       string;
    salaryMovementDate: Date;
    newSalary:          number;
}

// Converts JSON strings to/from your types
export class GetSalaryMovementScheduleDTOConvert {
    public static fromResponse(json: string): GetSalaryMovementScheduleDTO {
        return JSON.parse(json);
    }

    public static toJson(value: GetSalaryMovementScheduleDTO): string {
        return JSON.stringify(value);
    }
}
