import type {
    _experienceInfoSchema,
    _experienceListSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateExperiencesDetailResponseDTO = z.infer<
    typeof _experienceListSchema
>;

export type CandidateExperiencesDetailRequestDTO = Pick<
    CandidateExperiencesDetailResponseDTO,
    'experienceList'
>;

export type Experience = z.infer<typeof _experienceInfoSchema>;
