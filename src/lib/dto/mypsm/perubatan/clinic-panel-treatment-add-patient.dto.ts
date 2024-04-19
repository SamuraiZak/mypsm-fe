export interface TreatmentAddPatient {
    id?:             number;
    employeeNumber: string;
    patientList:    PatientList[];
}

export interface PatientList {
    name:                 string;
    relationshipId:         number | null;
    identityDocumentCard: string;
    placementId:            number;
    date:                 string;
}

// Converts JSON strings to/from your types
export class TreatmentAddPatientConvert {
    public static fromJson(json: string): TreatmentAddPatient {
        return JSON.parse(json);
    }

    public static toJson(value: TreatmentAddPatient): string {
        return JSON.stringify(value);
    }
}