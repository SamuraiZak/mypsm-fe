export interface ForceViewDetailDTO {
    details: Details;
}

export interface Details {
    certificationDetail:         CertificationDetail;
    confirmationDetail:          CertificationDetail;
    documentCertificationDetail: DocumentCertificationDetail;
    letterCertificationDetail:   CertificationDetail;
}

export interface CertificationDetail {
    forcedId: number;
    name:     string;
    remark:   string;
    status:   boolean;
}

export interface DocumentCertificationDetail {
    download: null;
    document: CertificationDetail;
}

// Converts JSON strings to/from your types
export class ForceViewDetailDTOConvert {
    public static fromJson(json: string): ForceViewDetailDTO {
        return JSON.parse(json);
    }

    public static toJson(value: ForceViewDetailDTO): string {
        return JSON.stringify(value);
}
}
