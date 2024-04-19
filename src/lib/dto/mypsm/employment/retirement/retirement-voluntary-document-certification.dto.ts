export interface DocumentCertificationDetailDTO {
    voluntaryId: number;
    status:      boolean;
    remark:      string;
}

// Converts JSON strings to/from your types
export class DocumentCertificationDetailDTOConvert {
    public static fromJson(json: string): DocumentCertificationDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: DocumentCertificationDetailDTO): string {
        return JSON.stringify(value);
}
}