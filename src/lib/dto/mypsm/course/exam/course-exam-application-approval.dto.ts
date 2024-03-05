import type { _examApplicationApprovalSchema } from '$lib/schemas/mypsm/course/schema';
import type { z } from 'zod';

export type CourseExamApplicationApprovalDTO = z.infer<
    typeof _examApplicationApprovalSchema
>;
