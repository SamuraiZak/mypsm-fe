export interface MedicalClinicApplication {
    district:                      string;
    name:                          string;
    panelAppointedDate:            string;
    panelContractEndDate:          string;
    address:                       string;
    email:                         string;
    contactNumber:                 string;
    bankName:                      string;
    bankAccount:                   string;
    foundationDate:                string;
    clinicType:                    string;
    ownershipStatus:               string;
    registeredMedicalPractitioner: string;
    branchCount:                   number;
    clinicOfficeDistance:          number;
    nearestClinicDistance:         number;
    operationHours:                string;
}

// Converts JSON strings to/from your types
export class MedicalClinicApplicationConvert {
    public static fromJson(json: string): MedicalClinicApplication {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalClinicApplication): string {
        return JSON.stringify(value);
    }
}
