export interface MedicalClinicEmployeePaymentList {
    medicalClaimId: number;
    employeeId:     number;
    employeeNumber: string;
    name:           string;
    ICNumber:       string;
    totalToPay:     number;
    totalPayment:   number;
    paymentType:    null;
    status:         string;
}

// Converts JSON strings to/from your types
export class MedicalClinicEmployeePaymentListConvert {
    public static fromJson(json: string): MedicalClinicEmployeePaymentList[] {
        return JSON.parse(json);
    }

    public static toJsonz(value: MedicalClinicEmployeePaymentList[]): string {
        return JSON.stringify(value);
    }
}
