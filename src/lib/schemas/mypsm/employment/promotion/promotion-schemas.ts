import { booleanSchema, numberSchema, shortTextSchema } from '$lib/schemas/common/schema-type';
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

export const _addNewPromotion = z.object({
    promotionType: shortTextSchema,
    employeeIds: z.number().array(),
    grade: shortTextSchema,
})

export const _promotionCommonApproval = z.object({
    id: z.number(),
    promotionType: shortTextSchema,
    status: booleanSchema,
    remark: z.string().nullable(),
    mark: z.number().nullable(),
})

export const _promotionIntegrityApproval = z.object({
    id: z.number().array(),
    promotionType: shortTextSchema,
    status: booleanSchema,
})

export const _editPromotionCertification = z.object({
    id: z.number(),
    promotionType: shortTextSchema,
    meetingNameCount: shortTextSchema,
    meetingResult: booleanSchema,
    meetingRemark: shortTextSchema,
    meetingDate: shortTextSchema,
    confirmedDate: z.string().default(""),
    actingEndDate: z.string().default(""),
    gradeRevertDate: z.string().default(""),
    newPlacement: z.string().default(""),
    currentSalary: numberSchema,
    newSalary: numberSchema,
})

export const _editPromotionPlacement = z.object({
    id: z.number(),
    promotionType: shortTextSchema,
    promotionDate: shortTextSchema,
    salaryMovementMonth: shortTextSchema,
    newGrade: z.string({invalid_type_error: "Medan ini tidak boleh kosong."}),
    newPlacement: z.string({invalid_type_error: "Medan ini tidak boleh kosong."}),
})

export const _editEmployeePromotion = z.object({
    id: z.number(),
    promotionType: shortTextSchema,
    confirmedDate: shortTextSchema,
    supporterName: shortTextSchema.nullable(),
    approverName: shortTextSchema.nullable(),
    status: booleanSchema,
    remark: z.string().nullable(),
})