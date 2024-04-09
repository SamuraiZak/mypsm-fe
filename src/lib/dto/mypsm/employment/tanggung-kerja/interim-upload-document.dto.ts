import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto";

export interface InterimUploadDocuments {
    interimId: number;
    documents: DocumentBase64RequestDTO[];
};
