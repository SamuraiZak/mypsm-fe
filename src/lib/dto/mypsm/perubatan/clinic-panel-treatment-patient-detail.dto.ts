export interface ClinicPanelTreatmentPatientDetail {
    name:                 string;
    relationshipId:       number;
    identityDocumentCard: string;
    placementId:          number;
    date:                 string;
}

// Converts JSON strings to/from your types
export class ClinicPanelTreatmentPatientDetailConvert {
    public static fromJson(json: string): ClinicPanelTreatmentPatientDetail[] {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicPanelTreatmentPatientDetail[]): string {
        return JSON.stringify(value);
    }
}

export interface ClinicPanelTreatmentDetailList {
    claimId:       number;
    patientName:   string;
    treatmentList: TreatmentList[];
}

export interface TreatmentList {
    description: string;
    amount:      number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static fromJson(json: string): ClinicPanelTreatmentDetailList[] {
        return JSON.parse(json);
    }

    public static toJson(value: ClinicPanelTreatmentDetailList[]): string {
        return JSON.stringify(value);
    }
}