import type { _academicInfoSchema, _academicListRequestSchema, _academicListResponseSchema } from '$lib/schemas/mypsm/profile/profile-schemas';
import type { z } from 'zod';

export type academicResponseDTO = z.infer<
    typeof _academicListResponseSchema
>;

export type academicRequestDTO = z.infer<
    typeof _academicListRequestSchema
>;


export type Academic = z.infer<typeof _academicInfoSchema>;