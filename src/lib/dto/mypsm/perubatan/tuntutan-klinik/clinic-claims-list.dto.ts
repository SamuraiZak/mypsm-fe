export interface MedicalClinicClaimsList {
    claimId:      number;
    employeeName: string;
    ICNumber:     string;
    patients:     ClinicPatient[];
}

export interface ClinicPatient {
    patientName:  string;
    ICNumber:     string;
    treatments:   ClinicTreatment[];
    relationship: string;
    total:        number;
}

export interface ClinicTreatment {
    name: string;
}

// Converts JSON strings to/from your types
export class MedicalClinicClaimsListConvert {
    public static fromJson(json: string): MedicalClinicClaimsList[] {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalClinicClaimsList[]): string {
        return JSON.stringify(value);
    }
}