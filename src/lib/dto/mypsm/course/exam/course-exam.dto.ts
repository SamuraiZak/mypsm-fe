import type {
    _editExamInfoRequestSchema,
    _examInfoRequestSchema,
    _examInfoResponseSchema,
} from '$lib/schemas/mypsm/course/schema';
import type { z } from 'zod';

export type CourseCreateExamRequestDTO = z.infer<typeof _examInfoRequestSchema>;

export type CourseEditExamRequestDTO = z.infer<
    typeof _editExamInfoRequestSchema
>;

export type CourseExamDetailResponseDTO = z.infer<
    typeof _examInfoResponseSchema
>;
