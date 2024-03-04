import type {
    _familyListRequestSchema,
    _familyListResponseSchema,
    _relationsSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateFamilyDetailResponseDTO = z.infer<
    typeof _familyListResponseSchema
>;

export type CandidateFamilyDetailRequestDTO = z.infer<
    typeof _familyListRequestSchema
>;

export type Family = z.infer<typeof _relationsSchema>;
