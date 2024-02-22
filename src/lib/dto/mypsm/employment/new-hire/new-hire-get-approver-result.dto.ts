import type { _approvalResultSchema } from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateNewHireApproverResultDTO = z.infer<
    typeof _approvalResultSchema
>;
