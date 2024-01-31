export interface MedicalHistoryDiseaseNamesResponse {
    status:  string;
    message: string;
    data:    Data;
}

export interface Data {
    list: string[];
}
