import type {
    _experienceInfoSchema,
    _experienceListRequestSchema,
    _experienceListResponseSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateExperiencesDetailResponseDTO = z.infer<
    typeof _experienceListResponseSchema
>;

export type CandidateExperiencesDetailRequestDTO = z.infer<
    typeof _experienceListRequestSchema
>;

export type Experience = z.infer<typeof _experienceInfoSchema>;
