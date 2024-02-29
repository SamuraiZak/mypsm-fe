import type {
    _dependencyListSchema,
    _relationsSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateDependenciesDetailResponseDTO = z.infer<
    typeof _dependencyListSchema
>;

export type CandidateDependenciesDetailRequestDTO = Pick<
    CandidateDependenciesDetailResponseDTO,
    'dependenciesList'
>;

export type Dependency = z.infer<typeof _relationsSchema>;
