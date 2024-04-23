import type { _newHireFullDetailSchema } from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type NewHireFullDetailResponseDTO = z.infer<
    typeof _newHireFullDetailSchema
>;
