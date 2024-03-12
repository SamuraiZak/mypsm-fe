export interface MedicalDiseaseListDTO {
    disease: string[];
}

// Converts JSON strings to/from your types
export class MedicalDiseaseListDTOConvert {
    public static fromJson(json: string): MedicalDiseaseListDTO {
        return JSON.parse(json);
    }

    public static toJson(value: MedicalDiseaseListDTO): string {
        return JSON.stringify(value);
    }
}