import type { _fundApplicationDocumentSchema, _fundApplicationUploadDocSchema } from '$lib/schemas/mypsm/course/fund-application-schema';
import type { z } from 'zod';

export type CourseFundApplicationDocumentsResponseDTO = z.infer<
    typeof _fundApplicationDocumentSchema
>;

export type CourseFundApplicationUploadDocumentsRequestDTO = z.infer<
    typeof _fundApplicationUploadDocSchema
>;
