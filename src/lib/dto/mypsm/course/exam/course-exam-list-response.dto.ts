import type { _examListResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
import type { z } from 'zod';

export type CourseExamListResponseDTO = z.infer<typeof _examListResponseSchema>;
