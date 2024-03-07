import type { _activityInfoSchema, _activityListRequestSchema, _activityListResponseSchema, } from '$lib/schemas/mypsm/profile/profile-schemas';
import type { z } from 'zod';

export type activityResponseDTO = z.infer<
    typeof _activityListResponseSchema
>;

export type activityRequestDTO = z.infer<
    typeof _activityListRequestSchema
>;

export type Activity = z.infer<typeof _activityInfoSchema>;