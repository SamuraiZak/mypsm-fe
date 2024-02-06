export interface PostPersonalMedicalRecordHistoryRequest {
    medicalHistory: MedicalHistory[];
}

export interface MedicalHistory {
    disease:    string;
    isPersonal: boolean;
    isFamily:   boolean;
    remark:     Remark;
}

export enum Remark {
    Empty = "",
    SakitJiwa = "Sakit Jiwa",
}
