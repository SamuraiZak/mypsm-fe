
import type { _surcajEmployeeResponseSchema } from '$lib/schemas/mypsm/integrity/surcaj-scheme';
import type { z } from 'zod';

export type SurcajEmployeeDetailResponseDTO = z.infer<
    typeof _surcajEmployeeResponseSchema
>;
