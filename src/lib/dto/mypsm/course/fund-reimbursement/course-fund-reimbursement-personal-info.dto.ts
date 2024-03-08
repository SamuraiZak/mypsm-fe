import type { _fundReimbursementPersonalInfoResponseSchema } from '$lib/schemas/mypsm/course/fund-reimbursement-schema';
import type { z } from 'zod';

export type CourseFundReimbursementPersonalDetailResponseDTO = z.infer<
    typeof _fundReimbursementPersonalInfoResponseSchema
>;
