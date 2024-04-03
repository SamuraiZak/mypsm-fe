export interface MedicalClinicCalculation {
    months:         string;
    totalClaims:    number;
    numberOfClaims: number;
}

// Converts JSON strings to/from your types
export class MedicalClinicCalculationConvert {
    public static fromJson(json: string): MedicalClinicCalculation {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalClinicCalculation): string {
        return JSON.stringify(value);
    }
}
