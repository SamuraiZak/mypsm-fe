export interface EmployeeFinalSalaryDetailRequestDTO {
    employeeId: number;
}

export class EmployeeFinalSalaryDetailRequestDTOConvert {
    public static toFinalPayslipDTO(json: string): EmployeeFinalSalaryDetailRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: EmployeeFinalSalaryDetailRequestDTO): string {
        return JSON.stringify(value);
    }
}
