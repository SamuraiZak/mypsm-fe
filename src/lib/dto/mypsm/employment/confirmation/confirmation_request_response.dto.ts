import type {
    _confirmationApprovalSchema,
    _confirmationDiciplinarySchema,
    _confirmationExaminationSchema,
    _confirmationFullDetailSchema,
    _confirmationListSchema,
    _confirmationPersonalDetailSchema,
    _confirmationServiceSchema,
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
