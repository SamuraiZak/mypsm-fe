import type {
    _nextOfKinListRequestSchema,
    _dependencyListResponseSchema,
    _relationsSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateNextOfKinDetailResponseDTO = z.infer<
    typeof _dependencyListResponseSchema
>;

export type CandidateNextOfKinDetailRequestDTO = z.infer<
    typeof _nextOfKinListRequestSchema
>;

export type NextOfKin = z.infer<typeof _relationsSchema>;
