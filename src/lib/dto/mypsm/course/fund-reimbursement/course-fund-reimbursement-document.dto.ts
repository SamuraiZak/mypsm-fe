import type { DocumentBase64RequestDTO } from '$lib/dto/core/common/base-64-document-request.dto';
import type {
    _fundReimbursementDocumentSchema,
    _fundReimbursementUploadDocSchema,
} from '$lib/schemas/mypsm/course/fund-reimbursement-schema';
import type { z } from 'zod';

export type CourseFundReimbursementDocumentsResponseDTO = z.infer<
    typeof _fundReimbursementDocumentSchema
>;

export type CourseFundReimbursementUploadDocumentsRequestDTO = z.infer<
    typeof _fundReimbursementUploadDocSchema
>;

export type CourseFundReimbursementUploadDocumentsBase64RequestDTO = {
    id: number;
    documents?: DocumentBase64RequestDTO[];
};
