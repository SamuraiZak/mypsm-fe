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
    isDraft: z.boolean(),
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
    gradeRevertDate: z.string().nullish(),
    newPlacement: z.string().default(""),
    currentSalary: numberSchema,
    newSalary: numberSchema,
    isDraft: z.boolean(),
})

export const _editPromotionPlacement = z.object({
    id: z.number(),
    promotionType: shortTextSchema,
    promotionDate: shortTextSchema,
    salaryMovementMonth: shortTextSchema,
    newGrade: z.string({invalid_type_error: "Medan ini tidak boleh kosong."}),
    newPlacement: z.string({invalid_type_error: "Medan ini tidak boleh kosong."}),
    isDraft: z.boolean(),
})

export const _documentsSchema = z.object({
    template: z.array(z.object({ name: z.string(), document: z.string() })),
    attachment: z.array(z.object({ name: z.string(), document: z.string() })),
    isReadonly: z.boolean().readonly(),
    isDraft: z.boolean(),
});

export const _uploadDocumentsSchema = z.object({
    id: z.number(),
    promotionType: shortTextSchema,
    isDraft: z.boolean(),
    document: z
        .instanceof(File, { message: 'Sila muat naik dokumen berkenaan.' })
        .refine((f) => f.size < 10_000_000, 'Maximum 10 MB saiz muat naik.')
        .array()
        .min(1, { message: 'Dokumen berkenaan hendaklah dimuat naik.' }),
});

export const _editEmployeePromotion = z.object({
    id: z.number(),
    promotionType: shortTextSchema,
    confirmedDate: shortTextSchema,
    supporterName: shortTextSchema.nullable(),
    approverName: shortTextSchema.nullable(),
    status: booleanSchema,
    remark: z.string().nullish(),
    isDraft: z.boolean(),
})