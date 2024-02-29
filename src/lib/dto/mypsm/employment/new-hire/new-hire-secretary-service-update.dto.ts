import type {
    _serviceInfoRequestSchema,
    _serviceInfoResponseSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type NewHireSecretaryServiceUpdateResponseDTO = z.infer<
    typeof _serviceInfoResponseSchema
>;

export type NewHireSecretaryServiceUpdateRequestDTO = z.infer<
    typeof _serviceInfoRequestSchema
>;
