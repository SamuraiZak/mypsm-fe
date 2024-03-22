import type { _proceedingChargeMeetingRequestSchema } from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
import type { z } from 'zod';

export type ProceedingCreateChargeRequestDTO = z.infer<
    typeof _proceedingChargeMeetingRequestSchema
>;
