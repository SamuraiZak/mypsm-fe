import type { _proceedingStaffDetailRequestSchema } from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
import type { z } from 'zod';

export type ProceedingStaffDetailRequestDTO = z.infer<
    typeof _proceedingStaffDetailRequestSchema
>;
