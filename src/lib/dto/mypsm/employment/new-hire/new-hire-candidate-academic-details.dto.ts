import type {
    _academicInfoSchema,
    _academicListRequestSchema,
    _academicListResponseSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateAcademicDetailResponseDTO = z.infer<
    typeof _academicListResponseSchema
>;

export type CandidateAcademicDetailRequestDTO = z.infer<
    typeof _academicListRequestSchema
>;

export type Academic = z.infer<typeof _academicInfoSchema>;
