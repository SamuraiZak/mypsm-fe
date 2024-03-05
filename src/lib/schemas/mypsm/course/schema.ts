//==========================================================
//================== Course Schema ==============
//==========================================================

import {
    longTextSchema,
    numberIdSchema,
    requiredDateStringSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

export const _examInfoResponseSchema = z.object({
    id: z.number().readonly(),
    examTitle: shortTextSchema,
    examTypeId: numberIdSchema,
    startDate: requiredDateStringSchema,
    endDate: requiredDateStringSchema,
    examDate: requiredDateStringSchema,
    examLocation: longTextSchema,
});
