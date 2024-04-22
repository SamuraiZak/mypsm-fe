import type {
    _approverSchema,
    _createMeetingBatchSchema,
    _createSupporterApproverSchema,
    _includedEmployeeDetailEmployeeSchema,
    _includedEmployeeDetailSchema,
    _includedEmployeeEmployeeSchema,
    _includedEmployeeSchema,
    _meetingResultEmployeeSchema,
    _newOfferFullDetailSchemaSchema,
    _newOfferMeetingListSchema,
    _processEmployeeSchema,
    _processSchema,
    _setApproverResultSchema,
    _setSupporterApproverSchema,
    _supporterApproverSchema,
    _updateMeetingResultSchema,
    _updateProcessSchema,
} from '$lib/schemas/mypsm/employment/new-offer/schema';
import type { z } from 'zod';

export type NewOfferMeetingListResponseDTO = z.infer<
    typeof _newOfferMeetingListSchema
>;
export type ApproverDTO = z.infer<typeof _approverSchema>;
export type ApproverRequestDTO = z.infer<typeof _setApproverResultSchema>;
export type IncludedEmployeeEmployeeDTO = z.infer<
    typeof _includedEmployeeEmployeeSchema
>;
export type IncludedEmployeeDetailEmployeeDTO = z.infer<
    typeof _includedEmployeeDetailEmployeeSchema
>;
export type MeetingResultEmployeeDTO = z.infer<
    typeof _meetingResultEmployeeSchema
>;
export type ProcessEmployeeDTO = z.infer<typeof _processEmployeeSchema>;
export type SetSupporterApproverDTO = z.infer<typeof _supporterApproverSchema>;
export type SetSupporterApproverRequestDTO = z.infer<
    typeof _setSupporterApproverSchema
>;
export type IncludedEmployeeDTO = z.infer<typeof _includedEmployeeSchema>;
export type IncludedEmployeeDetailDTO = z.infer<
    typeof _includedEmployeeDetailSchema
>;
export type MeetingResultDTO = z.infer<typeof _updateMeetingResultSchema>;

export type ProcessDTO = z.infer<typeof _processSchema>;

export type NewOfferFullDetailDTO = z.infer<
    typeof _newOfferFullDetailSchemaSchema
>;

export type NewOfferMeetingRequestDTO = z.infer<
    typeof _createMeetingBatchSchema
>;
export type NewOfferProcessRequestDTO = z.infer<typeof _updateProcessSchema>;

export type NewOfferSupporterApproverRequestDTO = z.infer<
    typeof _createSupporterApproverSchema
>;
