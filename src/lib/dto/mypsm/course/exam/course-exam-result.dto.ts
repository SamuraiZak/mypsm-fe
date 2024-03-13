import type {
    _examApplicationResultRequestSchema,
    _examApplicationResultResponseSchema,
} from '$lib/schemas/mypsm/course/exam-schema';
import type { z } from 'zod';

export type CourseExamApplicationResultResponseDTO = z.infer<
    typeof _examApplicationResultResponseSchema
>;
export type CourseExamApplicationResultRequestDTO = z.infer<
    typeof _examApplicationResultRequestSchema
>;
