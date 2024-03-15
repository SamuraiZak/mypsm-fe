import type { _proceedingAppealSchema } from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
import type { z } from 'zod';

export type ProceedingAppealResultDTO = z.infer<typeof _proceedingAppealSchema>;
