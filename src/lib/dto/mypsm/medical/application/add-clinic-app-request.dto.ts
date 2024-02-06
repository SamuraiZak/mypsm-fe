export interface AddClinicAppRequestDTO {
    district: string;
    name: string;
    address: string;
    email: string;
    contactNumber: string;
    foundationDate: Date;
    clinicType: string;
    ownershipStatus: string;
    registeredMedicalPractitioner: string;
    branchCount: number;
    clinicOfficeDistance: number;
    nearestClinicDistance: number;
    operationHours: string;
}

// Converts JSON strings to/from your types
export class AddClinicAppRequestConvert {
    public static fromJson(json: string): AddClinicAppRequestDTO {
        return JSON.parse(json);
    }

    public static toJson(value: AddClinicAppRequestDTO): string {
        return JSON.stringify(value);
    }
}
