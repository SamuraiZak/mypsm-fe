// =====================================================================
// Service Allowance Schema - Bantuan Pakaian Istiadat
// =====================================================================

import { z } from 'zod';

export const _bantuanPakaianIstiadatAddSchema = z.object({
    documents: z
        .instanceof(File, { message: 'Please upload a file.' })
        .refine((f) => f.size < 100_000, 'Max 100 kB upload size.')
        .array(),
    reason: z.string(),
    personal: z.number(),
    partner: z.number(),
    allowanceTypeCode: z.string(),
});
