import type {
    _nextOfKinListSchema,
    _relationsSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateNextOfKinDetailResponseDTO = z.infer<
    typeof _nextOfKinListSchema
>;

export type CandidateNextOfKinDetailRequestDTO = Pick<
    CandidateNextOfKinDetailResponseDTO,
    'nextOfKinsList'
>;

export type NextOfKin = z.infer<typeof _relationsSchema>;
