export interface GetPersonalMedicalRecordResponse {
    status: number;
    message: string;
    data: PersonalMedicalRecordResponseData;
}

export interface PersonalMedicalRecordResponseData {
    medicalHistory: MedicalHistory[];
}

export interface MedicalHistory {
    id: string;
    diseases: string;
    isPersonal: boolean;
    isFamily: boolean;
    remark: string;
}
