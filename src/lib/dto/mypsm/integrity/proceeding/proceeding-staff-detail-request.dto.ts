import type {
    _proceedingIDSchema,
    _proceedingStaffDetailRequestSchema,
} from '$lib/schemas/mypsm/integrity/proceeding-scheme';
import type { z } from 'zod';

export type ProceedingIntegrityIdRequestDTO = z.infer<
    typeof _proceedingIDSchema
>;

export type ProceedingStaffDetailRequestDTO = z.infer<
    typeof _proceedingStaffDetailRequestSchema
>;
