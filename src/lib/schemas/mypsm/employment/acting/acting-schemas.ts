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
    grade: z.string().min(1, {message: "Ruangan ini tidak boleh kosong."}),
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
    meetingDate: shortTextSchema,
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

export const _actingApprovalSchema = z.object({
    id: z.number(),
    remark: shortTextSchema,
    status: booleanSchema,
})








export const _postponeDetailSchema = z.object({
    id: z.number(),
    meetingResult: shortTextSchema,
    newReportDutyDate: shortTextSchema,
    newPlacement: shortTextSchema,
    approvalLetter: z.object({
        base64: z.string(),
        name: z.string()
    }).array()
})




// =============== gred utama validation 
export const _mainUpdatePromotionMeetingResultSchema = z.object({
    batchId: z.number(),
    actingPosition: z.string().min(1, {message: "Medan ini tidak boleh kosong."}),
    actingGrade: z.string().min(1, {message: "Medan ini tidak boleh kosong."}),
    placement: z.string().min(1, {message: "Medan ini tidak boleh kosong."}),
    meetingName: shortTextSchema,
    meetingDate: shortTextSchema,
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

const documentSchema = z.object({
    base64: z.string(),
    name: shortTextSchema,
})
// ================== kakitangan schema
export const _placementAmendmentApplication = z.object({
    id: z.number(),
    postponeNeeded: booleanSchema,
    postponeReason: shortTextSchema.nullable(),
    requestedPlacement: shortTextSchema.nullable(),
    requestedReportDate: stringToMinDate.nullable(),
    documents: documentSchema.array().nullable(),
})
