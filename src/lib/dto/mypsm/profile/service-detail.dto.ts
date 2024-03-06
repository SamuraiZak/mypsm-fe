import type { _serviceInfoRequestSchema, _serviceInfoResponseSchema } from '$lib/schemas/mypsm/profile/profile-schemas';
import type { z } from 'zod';

export type serviceResponseDTO = z.infer<
    typeof _serviceInfoResponseSchema
>;

export type serviceRequestDTO = z.infer<
    typeof _serviceInfoRequestSchema
>;
