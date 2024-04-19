export interface ResponseDocumentcertificationDetailDTO {
    interimId: number;
    status:    boolean;
    remark:    string;
}

// Converts JSON strings to/from your types
export class ResponseDocumentcertificationDetailDTOConvert {
    public static fromJson(json: string): ResponseDocumentcertificationDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ResponseDocumentcertificationDetailDTO): string {
        return JSON.stringify(value);
}
}