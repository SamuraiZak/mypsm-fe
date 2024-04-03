import type { _proceedingSuspensionListSchema } from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
import type { z } from 'zod';

export type ProceedingsuspensionListResponseDTO = z.infer<
    typeof _proceedingSuspensionListSchema
>[];
