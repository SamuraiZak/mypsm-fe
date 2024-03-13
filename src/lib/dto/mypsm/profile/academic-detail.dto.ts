import type { _academicEditRequestSchema, _academicInfoSchema, _academicListRequestSchema, _academicListResponseSchema } from '$lib/schemas/mypsm/profile/profile-schemas';
import type { z } from 'zod';

export type academicResponseDTO = z.infer<
    typeof _academicListResponseSchema
>;

export type academicRequestDTO = z.infer<
    typeof _academicListRequestSchema
>;

export type editAcademicRequestDTO = z.infer<
    typeof _academicEditRequestSchema
>;


export type Academic = z.infer<typeof _academicInfoSchema>;