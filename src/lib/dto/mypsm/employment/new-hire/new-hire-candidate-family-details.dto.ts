import type {
    _familyListSchema,
    _relationsSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateFamilyDetailResponseDTO = z.infer<
    typeof _familyListSchema
>;

export type CandidateFamilyDetailRequestDTO = Pick<
    CandidateFamilyDetailResponseDTO,
    'dependenciesList'
>;

export type Family = z.infer<typeof _relationsSchema>;
