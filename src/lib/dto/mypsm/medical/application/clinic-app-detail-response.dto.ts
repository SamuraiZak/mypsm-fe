export interface ClinicAppDetailDTO {
    name:                          string;
    email:                         string;
    address:                       string;
    district:                      string;
    state:                         string;
    contactNumber:                 string;
    foundationDate:                Date;
    clinicType:                    string;
    ownershipStatus:               string;
    registeredMedicalPractitioner: string;
    branchCount:                   number;
    clinicOfficeDistance:          number;
    nearestClinicDistance:         number;
    operationHours:                string;
    supporterID:                   number;
    approverID:                    number;
    status:                        string;
}

// Converts JSON strings to/from your types
export class ClinicAppDetailConvert {
    public static fromJson(json: string): ClinicAppDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicAppDetailDTO): string {
        return JSON.stringify(value);
    }
}