import type {
    _experienceInfoSchema,
    _experienceListSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateExperiencesDetailDTO = z.infer<
    typeof _experienceListSchema
>;
export type Dependency = z.infer<typeof _experienceInfoSchema>;
