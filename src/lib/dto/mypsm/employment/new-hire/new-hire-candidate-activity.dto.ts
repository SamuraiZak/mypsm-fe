import type {
    _activityInfoSchema,
    _activityListSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateActivityDetailResponseDTO = z.infer<
    typeof _activityListSchema
>;

export type CandidateActivityDetailRequestDTO = Pick<
    CandidateActivityDetailResponseDTO,
    'activityList'
>;

export type Activity = z.infer<typeof _activityInfoSchema>;
