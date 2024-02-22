import type { _documentsSchema } from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type NewHireDocumentsDTO = z.infer<typeof _documentsSchema>;
