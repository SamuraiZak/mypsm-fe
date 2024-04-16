export interface TreatmentAddTreatmentDetail {
    claimId:     number;
    patientList: TreatmentPatientList[];
}

export interface TreatmentPatientList {
    patientName:   string;
    treatmentList: TreatmentDetailList[];
}

export interface TreatmentDetailList {
    description: string;
    amount:      number;
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
