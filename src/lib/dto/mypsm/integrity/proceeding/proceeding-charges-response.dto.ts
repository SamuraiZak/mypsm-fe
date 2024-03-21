import type {
    _proceedingAccusationSchema,
    _proceedingChargeSchema,
} from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
import type { z } from 'zod';

export type ProceedingChargeListResponseDTO = z.infer<
    typeof _proceedingChargeSchema
>[];

export type ProceedingChargeDetailResponseDTO = z.infer<
    typeof _proceedingChargeSchema
>;

export type ProceedingAccusationDTO = z.infer<
    typeof _proceedingAccusationSchema
>;
