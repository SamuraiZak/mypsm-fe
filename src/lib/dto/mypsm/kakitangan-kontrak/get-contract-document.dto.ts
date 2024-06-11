export interface GetContractDocumentDTO {
    template:   string;
    templateName: string;
    attachment: string;
    attachmentName: string;
    isReadonly: boolean;
}

export interface RenewContractDocument {
    template: string;
    templateName: string;
}