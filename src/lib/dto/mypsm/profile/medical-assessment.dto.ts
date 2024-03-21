import type { _diseaseInfoCollectionSchema, _diseaseInfoCollectionSchemaRequest, _diseaseInfoSchema, _medicalAssessmentListRequestSchema, _medicalAssessmentListResponseSchema } from '$lib/schemas/mypsm/profile/profile-schemas';
import type { z } from 'zod';

export type medicalAssessmentResponseDTO = z.infer<
    typeof _diseaseInfoCollectionSchema
>;

export type medicalAssessmentRequestDTO = z.infer<
    typeof _diseaseInfoCollectionSchemaRequest
>;

export type diseaseInfoDTO = z.infer<typeof _diseaseInfoSchema>;
