import type { _addNewHireSchema } from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type NewHireAddCandidateDTO = z.infer<typeof _addNewHireSchema>;
