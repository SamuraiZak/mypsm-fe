import * as z from 'zod';

// accumulation detail schema
export const GcrAccumulationDetailSchema = z.object({
    collectedGCR: z.number(),
});
export type GcrAccumulationDetail = z.infer<typeof GcrAccumulationDetailSchema>;

// gcr endorsement schema
export const GcrEndorsementSchema = z.object({
    id: z.number(),
    status: z.boolean(),
    remark: z.string(),
});
export type GcrEndorsement = z.infer<typeof GcrEndorsementSchema>;

// gcr add detail
export const GcrWithdrawalDetailAddSchema = z.object({
    employeeId: z.number(),
    withdrawalType: z.number(),
});
export type GcrWithdrawalDetailAdd = z.infer<
    typeof GcrWithdrawalDetailAddSchema
>;

export const GcrWithdrawalCalculationSchema = z.object({
    id: z.number(),
    totalPayment: z.number(),
});
export type GcrWithdrawalCalculation = z.infer<
    typeof GcrWithdrawalCalculationSchema
>;
