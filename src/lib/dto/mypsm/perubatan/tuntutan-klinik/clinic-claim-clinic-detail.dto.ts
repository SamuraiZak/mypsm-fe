export interface MedicalClinicClaimDetail {
    name:          string;
    email:         string;
    address:       string;
    postcode:      string;
    city:          string;
    state:         string;
    contactNumber: string;
}

// Converts JSON strings to/from your types
export class MedicalClinicClaimDetailConvert {
    public static fromJson(json: string): MedicalClinicClaimDetail {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalClinicClaimDetail): string {
        return JSON.stringify(value);
    }
}