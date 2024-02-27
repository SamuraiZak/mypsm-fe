import type { _documentsSchema, _uploadDocumentsSchema } from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type NewHireDocumentsDTO = z.infer<typeof _documentsSchema>;
export type UploadedDocumentsDTO = z.infer<typeof _uploadDocumentsSchema>;
