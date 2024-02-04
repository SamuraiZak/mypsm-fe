export interface FinalPayslipListDTO {
    id:              number;
    employeeNumber:  number;
    name:            string;
    icNumber:        string;
    baseSalary:      number;
    allowances:      number;
    salaryDeduction: number;
    retiremenType:   string;
    status:          string;
    remark:          string;
}

// Converts JSON strings to/from your types
export class FinalPayslipListDTOConvert {
    public static toFinalPayslipListDTO(json: string): FinalPayslipListDTO {
        return JSON.parse(json);
    }

    public static finalPayslipListDTOToJson(value: FinalPayslipListDTO): string {
        return JSON.stringify(value);
    }
}