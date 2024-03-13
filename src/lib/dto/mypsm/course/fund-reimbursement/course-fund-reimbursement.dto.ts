import type {
    _createFundReimbursementRequestSchema,
    _fundReimbursementDetailResponseSchema,
    _fundReimbursementListResponseSchema,
} from '$lib/schemas/mypsm/course/fund-reimbursement-schema';
import type { z } from 'zod';

export type CourseFundReimbursementListResponseDTO = z.infer<
    typeof _fundReimbursementListResponseSchema
>;

export type CourseFundReimbursementDetailResponseDTO = z.infer<
    typeof _fundReimbursementDetailResponseSchema
>;

export type CourseAddFundReimbursementRequestDTO = z.infer<
    typeof _createFundReimbursementRequestSchema
>;
