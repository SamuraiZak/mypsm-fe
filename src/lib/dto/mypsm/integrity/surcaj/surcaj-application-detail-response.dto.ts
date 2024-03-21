
import type { _applicationDetail } from '$lib/schemas/mypsm/integrity/surcaj-scheme';
import type { z } from 'zod';

export type SurcajApplicationDetailResponseDTO = z.infer<
    typeof _applicationDetail
>;
