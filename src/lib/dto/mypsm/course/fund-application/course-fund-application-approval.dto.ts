import type { _fundApplicationApprovalSchema, _setApproversSchema } from '$lib/schemas/mypsm/course/fund-application-schema';
import type { z } from 'zod';

export type CourseFundApplicationApprovalDTO = z.infer<
    typeof _fundApplicationApprovalSchema
>;
export type CourseFundApplicationSetApproverDTO = z.infer<
    typeof _setApproversSchema
>;
