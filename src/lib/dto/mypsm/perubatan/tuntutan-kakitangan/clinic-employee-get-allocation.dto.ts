export interface MedicalClinicEmployeeGetAllocationList {
    employeeNumber:      string;
    name:                string;
    ICNumber:            string;
    totalAllocated:      number;
    allocationRemainder: number;
    amountToPay:         number;
}

// Converts JSON strings to/from your types
export class MedicalClinicEmployeeGetAllocationListConvert {
    public static fromJson(json: string): MedicalClinicEmployeeGetAllocationList[] {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalClinicEmployeeGetAllocationList[]): string {
        return JSON.stringify(value);
    }
}