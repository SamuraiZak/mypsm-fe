import type { _experienceEditRequestSchema, _experienceInfoSchema, _experienceListRequestSchema, _experienceListResponseSchema } from '$lib/schemas/mypsm/profile/profile-schemas';
import type { z } from 'zod';

export type experiencesResponseDTO = z.infer<
    typeof _experienceListResponseSchema
>;

export type experiencesRequestDTO = z.infer<
    typeof _experienceListRequestSchema
>;

export type experiencesEditRequestDTO = z.infer<
    typeof _experienceEditRequestSchema
>;

export type Experience = z.infer<typeof _experienceInfoSchema>;