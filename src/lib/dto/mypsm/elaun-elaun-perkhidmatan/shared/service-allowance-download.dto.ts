export interface ServiceAllowanceDownloadDTO {
    allowanceID: number;
    allowanceTypeCode: string;
    document: Document[];
}

export interface ServiceAllowanceDocumentDTO {
    document: string;
}
