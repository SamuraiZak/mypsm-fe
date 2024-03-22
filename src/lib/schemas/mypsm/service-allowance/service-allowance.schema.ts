// ================================================================
// Service Allowance Schema
// ================================================================

import * as z from 'zod';

export const ServiceAllowanceEndorsementSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    remark: z.string(),
    status: z.boolean(),
});

export type ServiceAllowanceEndorsementSchema = z.infer<
    typeof ServiceAllowanceEndorsementSchema
>;

export const ServiceAllowanceEndorserDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    supporter: z.string(),
    approver: z.string(),
});
export type ServiceAllowanceEndorserDetail = z.infer<
    typeof ServiceAllowanceEndorserDetailSchema
>;

export const ServiceAllowanceDocumentSchema = z.object({
    base64: z.string(),
    name: z.string(),
});
export type ServiceAllowanceDocument = z.infer<
    typeof ServiceAllowanceDocumentSchema
>;

export const ServiceAllowanceInfoCeremonyDressSchema = z.object({
    documents: z.array(ServiceAllowanceDocumentSchema).optional(),
    allowanceTypeCode: z.string(),
    reason: z.string(),
    personal: z.number(),
    partner: z.number(),
});
export type ServiceAllowanceInfoCeremonyDress = z.infer<
    typeof ServiceAllowanceInfoCeremonyDressSchema
>;
