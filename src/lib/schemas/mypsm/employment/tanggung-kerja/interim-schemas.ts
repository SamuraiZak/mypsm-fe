import {
    booleanSchema,
    codeSchema,
    dateSchema,
    numberSchema,
    requiredDateStringSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';
const stringToMinDate = z.string({ required_error: 'Medan ini tidak boleh kosong.', invalid_type_error: 'Medan ini tidak boleh kosong.' }).refine((val) => {
    const convertedStringToDate = new Date(val);
    const currentDate = new Date();
    return convertedStringToDate > currentDate;
}, { message: "Tarikh tidak boleh kurang dari tarikh semasa." })

const stringToMaxDate = z.string({ required_error: 'Medan ini tidak boleh kosong.', invalid_type_error: 'Medan ini tidak boleh kosong.' }).refine((val) => {
    const convertedStringToDate = new Date(val);
    const currentDate = new Date();
    return convertedStringToDate < currentDate;
}, { message: "Tarikh tidak boleh lebih dari tarikh semasa." })

// ===========================
// ============= Kakitangan 
// ===========================
export const _addNewInterimApplicationSchema = z.object({
    interimId: z.number().optional(),
    gradeId: numberSchema,
    placementId: numberSchema,
    newPlacementId: numberSchema,
    referenceNumber: z.string().nullable(),
    startDate: z.string(),
    endDate: z.string(),
    reason: shortTextSchema,
    isDraft: booleanSchema,
    isReadOnly: z.boolean().optional(),
})

export const _addInterimApprovalSchema = z.object({
    interimId: numberSchema,
    status: booleanSchema,
    remark: z.string(),
    name: z.string().optional(),
    isDraft: booleanSchema,
    approvalDate: z.string(),
})

export const _addDirectorSchema = z.object({
    interimId: numberSchema,
    isDraft: booleanSchema,
    director: shortTextSchema,
    type: shortTextSchema,
})

export const _checklistSchema = z.object({
    interimId: z.number(),
    preparer: shortTextSchema,
    checker: shortTextSchema,
    applicationLetterStatus: booleanSchema,
    certifiedFormStatus: booleanSchema,
    organisationalChartStatus: booleanSchema,
    jobDescriptionStatus: booleanSchema,
    orderLetterStatus: booleanSchema,
    leaveStatementStatus: booleanSchema,
    documentListStatus: booleanSchema,
    justificationStatus: booleanSchema,
    applicationLetterCheck: booleanSchema,
    certifiedFormCheck: booleanSchema,
    organisationalChartCheck: booleanSchema,
    jobDescriptionCheck: booleanSchema,
    orderLetterCheck: booleanSchema,
    leaveStatementCheck: booleanSchema,
    documentListCheck: booleanSchema,
    justificationCheck: booleanSchema,
})

export const _terminationCommonApproval = z.object({
    interimId: z.number(),
    status: booleanSchema,
    remark:z.string().default(''),
    isDraft: booleanSchema,
    approvalDate: z.string(),
})

export const _terminationSuppApp = z.object({
    interimId: z.number(),
    supporter: shortTextSchema.default(""),
    approver: shortTextSchema.default(""),
    isDraft: booleanSchema,
})

export const _interimDate = z.object({
    interimId: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    isDraft: booleanSchema,
})

export const _referenceNumber = z.object({
    interimId: z.number().readonly(),
    referenceNumber: z.string(),
    status: booleanSchema,
    slogan: z.string(),
    date: z.string(),
    isDraft: booleanSchema,
})