export interface FinalPayslipListFilterDTO {
    employeeNumber:     string;
    name:               string;
    identityCardNumber: string;
    retirementType:     string;
    status:             string;
}

// Converts JSON strings to/from your types
export class FinalPayslipListFilterDTOConvert {
    public static toFinalPayslipListFilterDTO(json: string): FinalPayslipListFilterDTO {
        return JSON.parse(json);
    }

    public static finalPayslipListFilterDTOToJson(value: FinalPayslipListFilterDTO): string {
        return JSON.stringify(value);
    }
}