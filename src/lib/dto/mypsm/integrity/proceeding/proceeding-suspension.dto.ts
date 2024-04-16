import type { _proceedingSuspensionSchema, _proceedingSuspensionViewSchema } from '$lib/schemas/mypsm/integrity/proceeding-scheme';
import type { z } from 'zod';

export type ProceedingSuspensionRequestDTO = z.infer<
    typeof _proceedingSuspensionSchema
>;

export type ProceedingSuspensionViewResponseDTO = z.infer<
    typeof _proceedingSuspensionViewSchema
>;
