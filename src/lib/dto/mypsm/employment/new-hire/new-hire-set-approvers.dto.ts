import type { _setApproversSchema } from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type NewHireSetApproversDTO = z.infer<typeof _setApproversSchema>;
