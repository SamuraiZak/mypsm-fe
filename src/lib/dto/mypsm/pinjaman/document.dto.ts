import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto";

export interface UploadDocuments {
    id: number;
    documents: DocumentBase64RequestDTO[];
};

export interface LoanDownload {
    document: LoanDocument[];
}

export interface LoanDocument {
    name: string;
    document: string;
}

export interface LoanAgreementLetter {
    document: string;
}