import type { _fundApplicationApprovalSchema } from '$lib/schemas/mypsm/course/fund-application-schema';
import type { z } from 'zod';

export type CourseFundApplicationApprovalDTO = z.infer<
    typeof _fundApplicationApprovalSchema
>;
