import type { _courseServiceInfoResponseSchema } from '$lib/schemas/mypsm/course/schema';
import type { z } from 'zod';

export type CourseExamApplicationPersonalDetailResponseDTO = z.infer<
    typeof _courseServiceInfoResponseSchema
>;
