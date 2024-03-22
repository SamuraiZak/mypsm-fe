export interface MedicalHistoryresponse {
    medicalHistory: MedicalHistory[];
}

export interface MedicalHistory {
    id:         number;
    diseases:   string;
    isPersonal: boolean;
    isFamily:   boolean;
    remark:     null | string;
}

// Converts JSON strings to/from your types
export class MedicalHistoryresponseConvert {
    public static fromJson (json: string): MedicalHistoryresponse {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalHistoryresponse): string {
        return JSON.stringify(value);
    }
}

export interface AddMedicalHistoryDTO {
    medicalHistory: MedicalHistoryItem[];
}

export interface MedicalHistoryItem {
    disease?:string;
    diseases:    string;
    isPersonal: boolean;
    isFamily:   boolean;
    remark:     string | null;
}


export interface MedicalHistoryResponseItemDTO {
    personalDetailId: number;
    diseases:         string;
    isPersonal:       boolean;
    isFamily:         boolean;
    remark:           string;
    createdBy?:        string;
    createdAt?:        string;
}

export interface GetMedicalHistoryResponseDTO {
    medicalHistory: MedicalHistoryItem[];
}


