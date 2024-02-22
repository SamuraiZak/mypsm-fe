import type {
    _nextOfKinListSchema,
    _relationsSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateNextOfKinDetailsDTO = z.infer<typeof _nextOfKinListSchema>;

export type NextOfKin = z.infer<typeof _relationsSchema>;
