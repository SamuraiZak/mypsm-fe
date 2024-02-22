import type { _personalInfoSchema } from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidatePersonalDTO = z.infer<typeof _personalInfoSchema>;
