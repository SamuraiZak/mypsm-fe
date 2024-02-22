import type {
    _academicInfoSchema,
    _academicListSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateAcademicDetailsDTO = z.infer<
    typeof _academicListSchema
>;

export type Academic = z.infer<typeof _academicInfoSchema>;
