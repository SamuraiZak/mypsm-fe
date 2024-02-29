import type { _serviceInfoSchema } from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type NewHireSecretaryServiceUpdateResponseDTO = Omit<
    z.infer<typeof _serviceInfoSchema>,
    'candidateId'
>;

export type NewHireSecretaryServiceUpdateRequestDTO = Omit<
    z.infer<typeof _serviceInfoSchema>,
    'isReadOnly'
>;
