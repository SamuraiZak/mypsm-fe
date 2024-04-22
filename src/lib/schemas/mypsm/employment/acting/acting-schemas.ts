//==========================================================
//================== Acting Schema ==============
//==========================================================
import {
    booleanSchema,
    codeSchema,
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

// ========================
// ============= Urus Setia 
// ========================

//Second stepper schema
export const _updateChosenCandidate = z.object({
    actingIds: z.number().array(),
    secretaryName: shortTextSchema,
    directorName: shortTextSchema,
})

//3rd stepper schema
export const _updateMeetingDetailSchema = z.object({
    batchId: z.number(),
    grade: shortTextSchema,
    position: shortTextSchema,
    meetingName: shortTextSchema,
    meetingDate: stringToMinDate,
    state: shortTextSchema,
    placement: shortTextSchema,
    interviewDate: stringToMinDate,
    interviewTime: shortTextSchema,
})

export const _updateMeetingResult = z.object({
    marks: numberSchema,
    actingIds: z.number().array(),
})

export const _updatePromotionDetail = z.object({
    batchId: z.number(),
    actingPosition: shortTextSchema,
    actingGrade: z.string().min(1, {message: "Ruangan ini tidak boleh kosong."}),
    meetingName: shortTextSchema,
    meetingDate: stringToMinDate,
})

export const _updatePromotionMeetingResultSchema = z.object({
    id: z.number(),
    meetingResult: shortTextSchema.default("Tidak Berjaya"),
})

export const _updatePlacementMeeting = z.object({
    batchId: z.number(),
    meetingName: shortTextSchema,
    meetingDate: stringToMaxDate,
})

export const _updateEmployeePlacementMeetingResultSchema = z.object({
    id: z.number(),
    meetingResult: shortTextSchema,
    newPlacement: shortTextSchema,
    newDirector: shortTextSchema,
    reportDate: stringToMinDate,
})

export const _updateActingResultSchema = z.object({
    id: z.number().optional(),
    actingId: z.number().optional(),
    actingResult: shortTextSchema,
    actingPosition: shortTextSchema,
    actingGrade: z.string().min(1, {message: "Ruangan ini tidak boleh kosong."}),
    newPlacement: shortTextSchema,
    reportDate: stringToMinDate,
    supporterName: shortTextSchema.optional(),
    approverName: shortTextSchema.optional(),
})









export const _updatePlacementAmendmentApplicationResultSchema = z.object({
    placementAmendmentResult: codeSchema.nullable().default(""),
    approvedNewReportingDate: stringToMinDate.nullable(),
    approvedRequestedPlacementAmendment: codeSchema.nullable().default(""),
    originalPlacementDate: codeSchema.nullable().default(""),
    placementRequestedAmendmentDate: codeSchema.nullable().default(""),
    placementAmendmentReason: codeSchema.nullable().default(""),
    approverName: codeSchema.nullable().default(""),
})

export const _actingApprovalSchema = z.object({
    id: z.number(),
    remark: shortTextSchema,
    status: booleanSchema,
})


// =============== gred utama validation 
export const _mainUpdatePromotionMeetingResultSchema = z.object({
    batchId: z.number(),
    actingPosition: shortTextSchema,
    actingGrade: shortTextSchema,
    placement: shortTextSchema,
    meetingName: shortTextSchema,
    referenceTitle: shortTextSchema,
    referenceNo: shortTextSchema,
    referenceDate: stringToMinDate,
    reportDate: stringToMinDate,
})

export const _mainUpdatePromotionMeetingResultDetailSchema = z.object({
    promotionMeetingResult: booleanSchema,
})

export const _mainUpdateActingEmployeeDetailSchema = z.object({
    actingPosition: codeSchema,
    actingGrade: codeSchema,
    newPlacement: codeSchema,
    reportingDate: stringToMinDate,
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
