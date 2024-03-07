import type { _medicalAssessmentListRequestSchema, _medicalAssessmentListResponseSchema } from '$lib/schemas/mypsm/profile/profile-schemas';
import type { z } from 'zod';

export type medicalAssessmentResponseDTO = z.infer<
    typeof _medicalAssessmentListResponseSchema
>;

export type medicalAssessmentRequestDTO = z.infer<
    typeof _medicalAssessmentListRequestSchema
>;
