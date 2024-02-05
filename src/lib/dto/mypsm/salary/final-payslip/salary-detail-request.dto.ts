export interface SalaryDetailRequestDTO {
    employeeId: number;
}

export class SalaryDetailRequestDTOConvert {
    public static toFinalPayslipDTO(json: string): SalaryDetailRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: SalaryDetailRequestDTO): string {
        return JSON.stringify(value);
    }
}
