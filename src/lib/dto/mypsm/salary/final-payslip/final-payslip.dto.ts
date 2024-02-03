export interface FinalPayslipDTO {
    Document: string;
}

// Converts JSON strings to/from your types
export class FinalPayslipDTOConvert {
    public static toFinalPayslipDTO(json: string): FinalPayslipDTO {
        return JSON.parse(json);
    }

    public static finalPayslipDTOToJson(value: FinalPayslipDTO): string {
        return JSON.stringify(value);
    }
}