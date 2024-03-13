import type { _fundReimbursementDocumentSchema, _fundReimbursementUploadDocSchema } from '$lib/schemas/mypsm/course/fund-reimbursement-schema';
import type { z } from 'zod';

export type CourseFundReimbursementDocumentsResponseDTO = z.infer<
    typeof _fundReimbursementDocumentSchema
>;

export type CourseFundReimbursementUploadDocumentsRequestDTO = z.infer<
    typeof _fundReimbursementUploadDocSchema
>;
