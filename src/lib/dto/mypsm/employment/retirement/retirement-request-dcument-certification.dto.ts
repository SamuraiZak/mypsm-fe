export interface RequestDocumentcertificationDetailDTO {
    forcedId: number;
    remark:   string;
    status:   boolean;
}

// Converts JSON strings to/from your types
export class RequestDocumentcertificationDetailDTOConvert {
    public static fromJson(json: string): RequestDocumentcertificationDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: RequestDocumentcertificationDetailDTO): string {
        return JSON.stringify(value);
}
}