export interface MedicalClaimAllocationList {
    id:                    number;
    totalAllocation:       number;
    totalSuccessfulClaims: number;
    remainderAllocation:   number;
    totalToPay:            number;
}

// Converts JSON strings to/from your types
export class MedicalClaimAllocationListConvert {
    public static fromJson(json: string): MedicalClaimAllocationList[] {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalClaimAllocationList[]): string {
        return JSON.stringify(value);
    }
}