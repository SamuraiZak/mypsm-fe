export interface MedicalClinicEmployeeAllocationClaimList {
    claimId:           number;
    employeeId:        number;
    employeeNumber:    string;
    employeeName:      string;
    identityCard:      string;
    claimAmount:       number;
    allocationBalance: number;
    status:            string;
}

// Converts JSON strings to/from your types
export class MedicalClinicEmployeeAllocationListConvert {
    public static fromJson(json: string): MedicalClinicEmployeeAllocationClaimList[] {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalClinicEmployeeAllocationClaimList[]): string {
        return JSON.stringify(value);
    }
}