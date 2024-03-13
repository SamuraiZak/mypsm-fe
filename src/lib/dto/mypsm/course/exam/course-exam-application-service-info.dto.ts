import type { _courseServiceInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
import type { z } from 'zod';

export type CourseExamApplicationServiceDetailResponseDTO = z.infer<
    typeof _courseServiceInfoResponseSchema
>;
