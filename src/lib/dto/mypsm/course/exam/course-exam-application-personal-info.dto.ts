import type { _coursePersonalInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
import type { z } from 'zod';

export type CourseExamApplicationPersonalDetailResponseDTO = z.infer<
    typeof _coursePersonalInfoResponseSchema
>;
