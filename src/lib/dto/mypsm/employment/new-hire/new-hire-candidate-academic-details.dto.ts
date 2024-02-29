import type {
    _academicInfoSchema,
    _academicListSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateAcademicDetailResponseDTO = z.infer<
    typeof _academicListSchema
>;

export type CandidateAcademicDetailRequestDTO = Pick<
    CandidateAcademicDetailResponseDTO,
    'academicList'
>;

export type Academic = Omit<z.infer<typeof _academicInfoSchema>, 'id'>;
