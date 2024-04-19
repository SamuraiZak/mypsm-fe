export interface LetterCertificationDetailDTO {
    voluntaryId: number;
    status:      boolean;
    remark:      string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toLetterCertificationDetailDTO(json: string): LetterCertificationDetailDTO {
        return JSON.parse(json);
    }

    public static letterCertificationDetailDTOToJson(value: LetterCertificationDetailDTO): string {
        return JSON.stringify(value);
    }
}
