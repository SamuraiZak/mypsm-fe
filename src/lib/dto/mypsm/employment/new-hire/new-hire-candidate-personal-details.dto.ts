import type {
    _personalInfoRequestSchema,
    _personalInfoResponseSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidatePersonalResponseDTO = z.infer<
    typeof _personalInfoResponseSchema
>;

export type CandidatePersonalRequestDTO = z.infer<
    typeof _personalInfoRequestSchema
>;
