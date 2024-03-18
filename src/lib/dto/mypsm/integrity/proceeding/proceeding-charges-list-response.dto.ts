import type { _proceedingChargeSchema } from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
import type { z } from 'zod';

export type ProceedingChargeListResponseDTO = z.infer<
    typeof _proceedingChargeSchema
>[];
