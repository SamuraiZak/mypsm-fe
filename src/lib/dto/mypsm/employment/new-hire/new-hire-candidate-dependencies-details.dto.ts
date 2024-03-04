import type {
    _dependencyListRequestSchema,
    _dependencyListResponseSchema,
    _relationsSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateDependenciesDetailResponseDTO = z.infer<
    typeof _dependencyListResponseSchema
>;

export type CandidateDependenciesDetailRequestDTO = z.infer<
    typeof _dependencyListRequestSchema
>;

export type Dependency = z.infer<typeof _relationsSchema>;
