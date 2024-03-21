import type { _surcajServiceResponseSchema } from '$lib/schemas/mypsm/integrity/surcaj-scheme';
import type { z } from 'zod';

export type SurcajServiceDetailResponseDTO = z.infer<
    typeof _surcajServiceResponseSchema
>;
