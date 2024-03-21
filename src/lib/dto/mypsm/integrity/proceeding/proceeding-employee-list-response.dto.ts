import type { _proceedingEmployeeListSchema } from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
import type { z } from 'zod';

export type ProceedingEmployeeListResponseDTO = z.infer<
    typeof _proceedingEmployeeListSchema
>;
