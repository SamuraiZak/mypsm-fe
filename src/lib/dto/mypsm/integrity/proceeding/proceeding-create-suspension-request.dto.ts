import type { _proceedingSuspensionSchema } from '$lib/schemas/mypsm/integrity/proceeding-scheme';
import type { z } from 'zod';

export type ProceedingSuspensionRequestDTO = z.infer<
    typeof _proceedingSuspensionSchema
>;
