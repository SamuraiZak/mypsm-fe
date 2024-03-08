import type { _fundReimbursementApprovalSchema } from '$lib/schemas/mypsm/course/fund-reimbursement-schema';
import type { z } from 'zod';

export type CourseFundReimbursementApprovalDTO = z.infer<
    typeof _fundReimbursementApprovalSchema
>;
