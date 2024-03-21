import type { _proceedingStaffDetailResponseSchema } from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
import type { z } from 'zod';

export type ProceedingEmployeeDetailResponseDTO = z.infer<
    typeof _proceedingStaffDetailResponseSchema
>;
