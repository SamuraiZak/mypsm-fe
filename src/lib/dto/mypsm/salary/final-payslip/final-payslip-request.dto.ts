export interface FinalPayslipRequestDTO {
    employeeId: number;
}

export class FinalPayslipRequestDTOConvert {
    public static toFinalPayslipRequestDTO(
        json: string,
    ): FinalPayslipRequestDTO {
        return JSON.parse(json);
    }

    public static FinalPayslipRequestDTOToJson(
        value: FinalPayslipRequestDTO,
    ): string {
        return JSON.stringify(value);
    }
}
