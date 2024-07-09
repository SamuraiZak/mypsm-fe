import {
    booleanSchema,
    numberSchema,
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
    gradeId: numberSchema.default(1),
    positionId: numberSchema,
    placementId: numberSchema,
    newPlacementId: numberSchema,
    referenceNumber: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    reason: shortTextSchema,
    isReadOnly: z.boolean().optional(),
})

export const _addInterimApprovalSchema = z.object({
    interimId: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema.nullable(),
    name: z.string().optional(),
    statusDescription: z.string().optional(),
})

export const _checklistSchema = z.object ({
    interimId:                 z.number(),
    preparer:                  shortTextSchema,
    checker:                   shortTextSchema,
    applicationLetterStatus:   booleanSchema,
    certifiedFormStatus:       booleanSchema,
    organisationalChartStatus: booleanSchema,
    jobDescriptionStatus:      booleanSchema,
    orderLetterStatus:         booleanSchema,
    leaveStatementStatus:      booleanSchema,
    documentListStatus:        booleanSchema,
    justificationStatus:       booleanSchema,
    applicationLetterCheck:    booleanSchema,
    certifiedFormCheck:        booleanSchema,
    organisationalChartCheck:  booleanSchema,
    jobDescriptionCheck:       booleanSchema,
    orderLetterCheck:          booleanSchema,
    leaveStatementCheck:       booleanSchema,
    documentListCheck:         booleanSchema,
    justificationCheck:        booleanSchema,
})

export const _terminationCommonApproval = z.object({
    interimId: z.number(),
    name: z.string().optional().default(""),
    remark: shortTextSchema.nullable().default(""),
    status: booleanSchema,
})

export const _terminationSuppApp = z.object({
    interimId: z.number(),
    supporter: shortTextSchema.default(""),
    approver: shortTextSchema.default(""),
})
