import type { _proceedingApproverSchema } from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
import type { z } from 'zod';

export type ProceedingApproverResultDTO = z.infer<
    typeof _proceedingApproverSchema
>;
