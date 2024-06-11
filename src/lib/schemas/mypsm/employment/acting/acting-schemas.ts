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
const documentSchema = z.object({
    base64: z.string(),
    name: shortTextSchema,
})
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
    grade: z.string().min(1, {message: "Ruangan ini tidak boleh kosong."}),
    position: shortTextSchema,
    meetingName: shortTextSchema,
    meetingDate: stringToMaxDate,
    state: shortTextSchema,
    placement: shortTextSchema,
    interviewDate: stringToMinDate,
    interviewTime: shortTextSchema,
})

export const _updateMeetingResult = z.object({
    marks: z.number({required_error: "Ruangan ini tidak boleh kosong.", invalid_type_error: "Ruangan ini tidak boleh kosong."}).lte(100, {message: "Hanya 0 hingga 100 sahaja dibenarkan."}),
    actingIds: z.number().array(),
})

export const _updatePromotionDetail = z.object({
    batchId: z.number(),
    actingPosition: shortTextSchema,
    actingGrade: z.string().min(1, {message: "Ruangan ini tidak boleh kosong."}),
    meetingName: shortTextSchema,
    meetingDate: stringToMaxDate,
})

export const _updatePromotionMeetingResultSchema = z.object({
    id: z.number(),
    meetingResult: shortTextSchema.refine((x) => x !== "Sedang Diproses", {message: "Sila tetapkan pilihan anda."}),
})

export const _updatePlacementMeeting = z.object({
    batchId: z.number().optional(),
    meetingName: shortTextSchema,
    meetingDate: shortTextSchema,
})

export const _updateEmployeePlacementMeetingResultSchema = z.object({
    id: z.number(),
    meetingResult: shortTextSchema,
    newPlacement: shortTextSchema.nullable(),
    newDirector: shortTextSchema.nullable(),
    reportDate: stringToMinDate.nullable(),
})

export const _updateActingResultSchema = z.object({
    id: z.number().optional(),
    actingId: z.number().optional(),
    actingResult: shortTextSchema,
    actingPosition: shortTextSchema.nullable().default(null),
    actingGrade: z.string().min(1, {message: "Ruangan ini tidak boleh kosong."}).nullish().default(null),
    newPlacement: shortTextSchema.nullish().default(null),
    reportDate: stringToMinDate.nullish().default(null),
    actingEndDate: stringToMinDate.nullish().default(null),
    supporterName: shortTextSchema.nullish().default(null),
    approverName: shortTextSchema.nullish().default(null),
})

export const _actingApprovalSchema = z.object({
    id: z.number(),
    remark: shortTextSchema,
    status: booleanSchema,
})

export const _postponeDetailSchema = z.object({
    id: z.number(),
    meetingResult: shortTextSchema,
    newReportDutyDate: z.string().min(1, {message: "Ruangan ini tidak boleh kosong."}),
    newPlacement: shortTextSchema,
    approvalLetter: z.object({
        base64: z.string(),
        name: z.string()
    }).array()
})


// gred utamaaa =========================
export const _certifySelected = z.object({
    batchId: z.number(),
    id: z.number().array(),
})

export const _mainMeetingResult = z.object({
    id: z.number(),
    status: booleanSchema,
})

export const _mainUpdatePromotionMeetingResultSchema = z.object({
    batchId: z.number(),
    actingPosition: z.string().min(1, {message: "Medan ini tidak boleh kosong."}),
    actingGrade: z.string().min(1, {message: "Medan ini tidak boleh kosong."}),
    placement: z.string().min(1, {message: "Medan ini tidak boleh kosong."}),
    meetingName: shortTextSchema,
    meetingDate: z.string().min(1, {message: "Ruangan ini tidak boleh kosong."}),
    referenceTitle: shortTextSchema,
    referenceNo: shortTextSchema,
    referenceDate: stringToMinDate,
    reportDate: stringToMinDate,
})

export const _mainUpdatePromotionMeetingResultDetailSchema = z.object({
    promotionMeetingResult: booleanSchema,
})

export const _mainMeetingDetail = z.object({
    id:             z.number(),
    actingPosition: z.string().min(1, {message: "Medan ini tidak boleh kosong."}),
    actingGrade:    z.string().min(1, {message: "Medan ini tidak boleh kosong."}),
    newPlacement:   z.string().min(1, {message: "Medan ini tidak boleh kosong."}),
    reportDate:     stringToMinDate,
    actingEndDate:  stringToMinDate,
    supporterName:  shortTextSchema,
    approverName:   shortTextSchema,
})

// ================== kakitangan schema
export const _placementAmendmentApplication = z.object({
    id: z.number(),
    postponeNeeded: booleanSchema.nullable().default(null),
    postponeReason: shortTextSchema.nullable(),
    requestedPlacement: shortTextSchema.nullable(),
    requestedReportDate: stringToMinDate.nullable(),
    documents: documentSchema.array().nullable(),
})
