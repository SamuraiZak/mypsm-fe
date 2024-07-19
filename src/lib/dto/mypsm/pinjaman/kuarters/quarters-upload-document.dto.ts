import type { DocumentBase64RequestDTO } from "$lib/dto/core/common/base-64-document-request.dto";

export interface QuartersUploadDocuments {
    id?: number;
    documents: DocumentBase64RequestDTO[];
    isDraft: boolean;
};
