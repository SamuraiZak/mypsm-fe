import type { _examApplicationResultSchema } from '$lib/schemas/mypsm/course/schema';
import type { z } from 'zod';

export type CourseExamApplicationResultDTO = z.infer<
    typeof _examApplicationResultSchema
>;
