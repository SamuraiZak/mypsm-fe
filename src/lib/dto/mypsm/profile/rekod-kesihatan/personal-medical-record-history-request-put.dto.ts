export interface PutPersonalMedicalRecordHistoryRequest {
    medicalHistory: MedicalHistory[];
}

export interface MedicalHistory {
    id:         number;
    disease:    string;
    isPersonal: boolean;
    isFamily:   boolean;
    remark:     string;
}
