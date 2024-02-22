import type {
    _familyListSchema,
    _relationsSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateFamilyDetailsDTO = z.infer<typeof _familyListSchema>;

export type Family = z.infer<typeof _relationsSchema>;
