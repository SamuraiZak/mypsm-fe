import type {
    _activityInfoSchema,
    _activityListRequestSchema,
    _activityListResponseSchema,
} from '$lib/schemas/mypsm/employment/new-hire/schema';
import type { z } from 'zod';

export type CandidateActivityDetailResponseDTO = z.infer<
    typeof _activityListResponseSchema
>;

export type CandidateActivityDetailRequestDTO = z.infer<
    typeof _activityListRequestSchema
>;

export type Activity = z.infer<typeof _activityInfoSchema>;
