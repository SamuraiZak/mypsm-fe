import * as z from 'zod';

export const GcrAccumulationDetailSchema = z.object({
    collectedGCR: z.number(),
});
export type GcrAccumulationDetail = z.infer<typeof GcrAccumulationDetailSchema>;

export const GcrEndorsementSchema = z.object({
    id: z.number(),
    status: z.boolean(),
    remark: z.string(),
});
export type GcrEndorsement = z.infer<typeof GcrEndorsementSchema>;
