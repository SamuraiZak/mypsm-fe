import type { _fundReimbursementServiceInfoResponseSchema } from '$lib/schemas/mypsm/course/fund-reimbursement-schema';
import type { z } from 'zod';

export type CourseFundReimbursementServiceDetailResponseDTO = z.infer<
    typeof _fundReimbursementServiceInfoResponseSchema
>;
