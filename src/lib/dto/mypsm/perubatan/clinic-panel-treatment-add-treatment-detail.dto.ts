export interface TreatmentAddTreatmentDetail {
    id:             number;
    employeeNumber: string;
    patientList:    PatientList[];
}

export interface PatientList {
    name:                 string;
    relationship:         string;
    identityDocumentCard: string;
    placement:            string;
    date:                 string;
}

// Converts JSON strings to/from your types
export class TreatmentAddTreatmentDetailConvert {
    public static fromJson(json: string): TreatmentAddTreatmentDetail {
        return JSON.parse(json);
    }

    public static toJson(value: TreatmentAddTreatmentDetail): string {
        return JSON.stringify(value);
    }
}