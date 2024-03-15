import type { _proceedingServiceResponseSchema } from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
import type { z } from 'zod';

export type ProceedingServiceDetailResponseDTO = z.infer<
    typeof _proceedingServiceResponseSchema
>;
