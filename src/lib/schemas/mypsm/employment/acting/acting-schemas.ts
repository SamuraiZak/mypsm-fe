//==========================================================
//================== Acting Schema ==============
//==========================================================
import {
    booleanSchema,
    codeSchema,
    dateSchema,
    longTextSchema,
    maxDateSchema,
    minDateSchema,
    numberIdSchema,
    numberSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

// ========================
// ============= Urus Setia 
// ========================

//Second stepper schema
export const _verifyMeetingResultDetailSchema = z.object({
    integritySecretaryName: codeSchema,
    directorName: codeSchema,
})

//3rd stepper schema
export const _updateMeetingDetailSchema = z.object({
    meetingName: codeSchema,
    meetingDate: minDateSchema,
    grade: numberIdSchema,
    position: numberIdSchema,
    interviewDate: minDateSchema,
    meetingTime: shortTextSchema,
    state: numberIdSchema,
    interviewCenter: numberIdSchema,
})

//
export const _updateMeetingResultSchema = z.object({
    totalMark: shortTextSchema.nullable().default(""),
    interviewDate: minDateSchema.nullable(),
    interviewCenter: codeSchema.nullable().default(""),
    panelName: codeSchema.nullable().default(""),
})

export const _updatePromotionMeetingResultSchema = z.object({
    promotionMeetingResult: shortTextSchema,
})

export const _updateEmployeePlacementMeetingResultSchema = z.object({
    newPlacement: shortTextSchema,
    newDirector: codeSchema,
    reportingDate: minDateSchema,
})

export const _updatePlacementAmendmentApplicationResultSchema = z.object({
    placementAmendmentResult: codeSchema.nullable().default(""),
    approvedNewReportingDate: minDateSchema.nullable(),
    approvedRequestedPlacementAmendment: codeSchema.nullable().default(""),
    originalPlacementDate: codeSchema.nullable().default(""),
    placementRequestedAmendmentDate: codeSchema.nullable().default(""),
    placementAmendmentReason: codeSchema.nullable().default(""),
    approverName: codeSchema.nullable().default(""),
})

export const _updateActingResultSchema = z.object({
    actingResult: codeSchema,
    actingPosition: codeSchema,
    reportingDate: minDateSchema,
    newPlacement: codeSchema,
    actingGrade: codeSchema,
    supporterId: codeSchema,
    approverId: codeSchema,
})

export const _directorResultSchema = z.object({
    directorRemark: shortTextSchema,
    directorResult: booleanSchema,
})

export const _supporterResultSchema = z.object({
    supporterRemark: shortTextSchema,
    supporterResult: booleanSchema,
})

export const _approverResultSchema = z.object({
    approverRemark: shortTextSchema,
    approverResult: booleanSchema,
})

// =============== gred utama validation 
export const _mainUpdatePromotionMeetingResultSchema = z.object({
    meetingName: codeSchema,
    meetingDate: minDateSchema,
    actingPosition: codeSchema,
    actingGrade: codeSchema,
    placement: codeSchema,
    reportingDate: minDateSchema,
    referenceNameLetter: codeSchema,
    letterDate: minDateSchema,
    letterTitle: shortTextSchema,
})

export const _mainUpdatePromotionMeetingResultDetailSchema = z.object({
    promotionMeetingResult: booleanSchema,
})

export const _mainUpdateActingEmployeeDetailSchema = z.object({
    actingPosition: codeSchema,
    actingGrade: codeSchema,
    newPlacement: codeSchema,
    reportingDate: minDateSchema,
    supporterName: codeSchema,
    approverName: codeSchema,
})

export const _mainSupporterAndApproverSchema = z.object({
    supporterName: codeSchema,
    approverName: codeSchema,
})

// ================== kakitangan schema
export const _placementAmendmentApplication = z.object({
    isNeedPlacementAmendment: booleanSchema,
    requestedReportingDate: z.coerce.string(),
    requestedPlacement: numberSchema.refine((x) =>  x > 0, {message: "Silap tetapkan pilihan anda."}),
    document: z
        .instanceof(File, { message: 'Sila muat naik dokumen berkenaan.' })
        .refine((f) => f.size < 1_000_000, 'Maximum 1 MB saiz muat naik.')
        .array(),
})
