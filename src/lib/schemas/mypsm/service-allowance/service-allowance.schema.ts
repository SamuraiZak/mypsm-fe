// =====================================================================
// Service Allowance Schema
// =====================================================================

import * as z from 'zod';

// common verification detail schema
export const _serviceAllowanceVerificationSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    remark: z.string().optional(),
    status: z.boolean(),
});

// common supporter and approver detail schema
export const _serviceAllowanceSuppAppDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    supporter: z.string(),
    approver: z.string(),
});

// common supporter feedback schema
export const _serviceAllowanceSupporterFeedbackSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    remark: z.string(),
    status: z.boolean(),
});

// common approver feedback form
export const _serviceAllowanceApproverFeedbackSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    remark: z.string(),
    status: z.boolean(),
});

// common director feedback form
export const _serviceAllowanceDirectorFeedbackSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    remark: z.string(),
    status: z.boolean(),
});

export const _allowanceFamilyDetailSchema = z.object({
    name: z.string(),
    age: z.number(),
    relationshipCode: z.string(),
});

export const _addTambangMengunjungiWilayahAsalSchemaSchema = z.object({
    allowanceTypeCode: z.string(),
    applyCode: z.string(),
    stateCode: z.string(),
    familyDetail: z.array(_allowanceFamilyDetailSchema),
});

// tambang upload schema
export const _serviceAllowanceUploadDocsTambang = z.object({
    documents: z
        .instanceof(File, { message: 'Please upload a file.' })
        .refine((f) => f.size < 100_000_000, 'Max 100 MB upload size.')
        .array(),
    allowanceId: z.string(),
    allowanceTypeCode: z.string(),
});
