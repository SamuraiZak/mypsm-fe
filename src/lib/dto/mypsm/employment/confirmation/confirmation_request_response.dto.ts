import type {
    _confirmationApprovalSchema,
    _confirmationContractContinuationSchema,
    _confirmationDiciplinarySchema,
    _confirmationExaminationSchema,
    _confirmationFullDetailSchema,
    _confirmationListSchema,
    _confirmationPersonalDetailSchema,
    _confirmationServiceSchema,
    _setApproversSchema,
    _updateConfirmationMeetingResultSchema,
} from '$lib/schemas/mypsm/employment/confirmation-in-service/schema';
import type { z } from 'zod';

export type ConfirmationApprovalDTO = z.infer<
    typeof _confirmationApprovalSchema
>;

export type ConfirmationDiciplinaryDTO = z.infer<
    typeof _confirmationDiciplinarySchema
>;

export type ConfirmationExaminationDTO = z.infer<
    typeof _confirmationExaminationSchema
>;

export type ConfirmationSetApproverDTO = z.infer<
    typeof _setApproversSchema
>;

export type ConfirmationPersonalDetailDTO = z.infer<
    typeof _confirmationPersonalDetailSchema
>;

export type ConfirmationServiceDTO = z.infer<typeof _confirmationServiceSchema>;

export type ConfirmationFullDetailResponseDTO = z.infer<
    typeof _confirmationFullDetailSchema
>;

export type ConfirmationListResponseDTO = z.infer<
    typeof _confirmationListSchema
>;

export type ConfirmationMeetingResultRequestDTO = z.infer<
    typeof _updateConfirmationMeetingResultSchema
>;

export type ConfirmationContractContinuationDTO = z.infer<
    typeof _confirmationContractContinuationSchema
>;
