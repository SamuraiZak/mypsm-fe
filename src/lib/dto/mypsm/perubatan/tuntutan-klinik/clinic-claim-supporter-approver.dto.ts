export interface MedicalClinicClaimSuppApp {
    id:          number;
    supporterId: number;
    approverId:  number;
}

// Converts JSON strings to/from your types
export class MedicalClinicClaimSuppAppConvert {
    public static fromJson(json: string): MedicalClinicClaimSuppApp {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalClinicClaimSuppApp): string {
        return JSON.stringify(value);
    }
}