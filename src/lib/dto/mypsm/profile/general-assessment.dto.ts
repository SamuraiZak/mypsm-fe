import type { _generalAssessmentInfoSchema, _generalAssessmentListRequestSchema, _generalAssessmentListResponseSchema } from '$lib/schemas/mypsm/profile/profile-schemas';
import type { z } from 'zod';

export type generalAssessmentResponseDTO = z.infer<
    typeof _generalAssessmentListResponseSchema
>;

export type generalAssessmentRequestDTO = z.infer<
    typeof _generalAssessmentListRequestSchema
>;

export type generalMedical = z.infer<typeof _generalAssessmentInfoSchema>;