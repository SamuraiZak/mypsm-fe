import type { _getNewHireApproversSchema } from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type NewHireGetApproversDTO = z.infer<typeof _getNewHireApproversSchema>;
