// ================================================================
// Service Record Schema
// ================================================================

import * as z from 'zod';

export const _relationsSchema = z.object({
    name: z.string(),
    address: z.string(),
});

export const _serviceRecordPersonalDetailSchema = z.object({
    name: z.string(),
    ICNumber: z.string(),
    birthDate: z.string(),
    birhtplace: z.string(),
    religion: z.string(),
    nextOfKins: z.array(_relationsSchema),
});
