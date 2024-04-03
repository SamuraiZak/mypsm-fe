export interface MedicalClinicEmployeePaymentPersonalDetail {
    employeeNumber: string;
    name:           string;
    ICNumber:       string;
    position:       string;
    placement:      string;
}

// Converts JSON strings to/from your types
export class MedicalClinicEmployeePaymentPersonalDetailConvert {
    public static fromJson(json: string): MedicalClinicEmployeePaymentPersonalDetail {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalClinicEmployeePaymentPersonalDetail): string {
        return JSON.stringify(value);
    }
}
