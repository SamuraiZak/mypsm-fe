export interface UnspecifydDocumentCertificationDetailDTO {
    id:     number;
    remark: string;
    status: boolean;
}

// Converts JSON strings to/from your types
export class UnspecifydDocumentCertificationDetailDTOConvert {
    public static toLetterCertificationDetailDTO(json: string): UnspecifydDocumentCertificationDetailDTO {
        return JSON.parse(json);
    }

    public static letterCertificationDetailDTOToJson(value: UnspecifydDocumentCertificationDetailDTO): string {
        return JSON.stringify(value);
    }
}
