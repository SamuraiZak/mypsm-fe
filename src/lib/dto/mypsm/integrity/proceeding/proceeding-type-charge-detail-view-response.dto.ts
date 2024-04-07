import type { _proceedingTypeChargeDetailsSchema } from '$lib/schemas/mypsm/integrity/proceeding-scheme';
import type { z } from 'zod';

export type ProceedingTypeChargeDetailViewResponseDTO = z.infer<
    typeof _proceedingTypeChargeDetailsSchema
>;
