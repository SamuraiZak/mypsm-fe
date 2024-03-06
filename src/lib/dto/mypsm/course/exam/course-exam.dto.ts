import type {
    _examInfoRequestSchema,
    _examInfoResponseSchema,
} from '$lib/schemas/mypsm/course/schema';
import type { z } from 'zod';

export type CourseCreateExamRequestDTO = z.infer<typeof _examInfoRequestSchema>;

export type CourseExamDetailResponseDTO = z.infer<
    typeof _examInfoResponseSchema
>;

