import type { _proceedingEmployeeResponseSchema } from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
import type { z } from 'zod';

export type ProceedingEmployeeDetailResponseDTO = z.infer<
    typeof _proceedingEmployeeResponseSchema
>;
