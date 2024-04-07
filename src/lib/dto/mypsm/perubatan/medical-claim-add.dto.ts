export interface MedicalClaimsAdd {
    treatmentDate: string;
    clinicId:      number;
    medicalLeave:  number;
    claims:        number[];
}

// Converts JSON strings to/from your types
export class MedicalClaimsAddConvert {
    public static fromJson(json: string): MedicalClaimsAdd {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalClaimsAdd): string {
        return JSON.stringify(value);
    }
}