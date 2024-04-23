import { booleanSchema, shortTextSchema } from '$lib/schemas/common/schema-type';
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
})

export const _editPromotionPlacement = z.object({
    id: z.number(),
    promotionType: shortTextSchema,
    promotionDate: shortTextSchema,
    salaryMovementMonth: shortTextSchema,
    newGrade: z.string(),
    newPlacement: shortTextSchema,
})

export const _editEmployeePromotion = z.object({
    id: z.number(),
    promotionType: shortTextSchema,
    confirmedDate: shortTextSchema,
    supporterName: shortTextSchema,
    approverName: shortTextSchema,
    confirmation: booleanSchema,
    remark: shortTextSchema,
})