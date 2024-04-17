import { booleanSchema, numberSchema, shortTextSchema } from "$lib/schemas/common/schema-type";
import { number, z } from "zod";

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

export const _addConfirmationSchema = z.object({
    id: z.number(),
    confirm: booleanSchema,
})

export const _quarterCommonApproval = z.object({
    id: z.number(),
    remark: shortTextSchema,
    status: booleanSchema,
})

export const _addQuarterDetails = z.object({
    id: z.number(),
    directorApproverId: numberSchema,
    movingInDate: stringToMinDate,
    quarterDetails: shortTextSchema,
    paymentMethod: numberSchema,
    renRate: numberSchema.optional(),
    deposit: numberSchema.optional(),
    billDeposit: numberSchema.optional(),
    email: shortTextSchema.optional(),
})