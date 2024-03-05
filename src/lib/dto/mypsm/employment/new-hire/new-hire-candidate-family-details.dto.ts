import type {
    _dependencyListResponseSchema,
    _familyListRequestSchema,
    _relationsSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateFamilyDetailResponseDTO = z.infer<
    typeof _dependencyListResponseSchema
>;

export type CandidateFamilyDetailRequestDTO = z.infer<
    typeof _familyListRequestSchema
>;

export type Family = z.infer<typeof _relationsSchema>;
