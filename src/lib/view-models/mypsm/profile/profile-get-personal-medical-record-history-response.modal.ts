export interface GetPersonalMedicalRecordResponse {
    status:  number;
    message: string;
    data:    Data;
}

export interface Data {
    medicalHistory: MedicalHistory[];
}

export interface MedicalHistory {
    id:         string;
    diseases:   string;
    isPersonal: boolean;
    isFamily:   boolean;
    remark:     string;
}
