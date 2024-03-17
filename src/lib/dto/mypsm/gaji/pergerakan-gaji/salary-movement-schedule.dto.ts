export interface SalaryMovementSchedule {
    employeeNo:         string;
    employeeName:       string;
    salaryMovementDate: Date;
    newSalary:          number;
}

// Converts JSON strings to/from your types
export class SalaryMovementScheduleConvert {
    public static fromJson(json: string): SalaryMovementSchedule {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryMovementSchedule): string {
        return JSON.stringify(value);
    }
}