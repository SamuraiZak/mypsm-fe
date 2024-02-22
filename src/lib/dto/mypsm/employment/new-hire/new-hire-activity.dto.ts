import type {
    _activityInfoSchema,
    _activityListSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateActivityDetailsDTO = z.infer<typeof _activityListSchema>;

export type Activity = z.infer<typeof _activityInfoSchema>;
