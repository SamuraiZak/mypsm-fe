import type { _proceedingSuspensionCriminalDetailSchema } from '$lib/schemas/mypsm/integrity/proceeding-scheme';
import type { z } from 'zod';

export type ProceedingSuspensionCriminalRequestDTO = z.infer<
    typeof _proceedingSuspensionCriminalDetailSchema
>;

export type ProceedingSuspensionCriminalViewResponseDTO = z.infer<
    typeof _proceedingSuspensionCriminalDetailSchema
>;