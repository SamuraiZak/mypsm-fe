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
const emailSchema = z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}).email("Sila nyatakan format emel yang sah. ");
const identificationCardSchema = z.string().refine(x => /^[0-9]+$/.test(x) && x.length == 12, {
    message: "Sila nyatakan No. Kad Pengenalan dalam format yang dikehendaki."
});
const phoneSchema = z.string().refine(x => /^[0-9]+$/.test(x) && (x.length == 11 || x.length == 10),
    {
        message: "Sila nyatakan No. Telefon Bimbit yang betul."
    });

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
    rentRate: numberSchema.optional(),
    deposit: numberSchema.optional(),
    billDeposit: numberSchema.optional(),
    email: shortTextSchema.optional(),
})

export const _moveOutQuarter = z.object({
    id: z.number(),
    movingOutDate: stringToMinDate,
    quarterDetails: shortTextSchema.optional(),
})

export const _outsiderApplication = z.object({
    employeeNumber: shortTextSchema.nullable(),
    name: shortTextSchema,
    identityDocumentNumber: identificationCardSchema,
    phoneNumber: phoneSchema,
    mailAddress: shortTextSchema,
    email: emailSchema.optional(),
    marital: booleanSchema.optional(),
    gradeId: numberSchema.optional(),
    placementId : numberSchema.optional(),
    maritalId: numberSchema.optional(),
})

export const _outsiderFamily = z.object({
    outsiderId: z.number(),
    name: shortTextSchema.nullable().default(""),
    phoneNumber: phoneSchema.nullable().default(""),
    position: shortTextSchema.nullable().default(""),
    currentSalary: numberSchema.nullable().default(0),
    totalChildren: z.string().nullable().default(""),
})

export const _outsiderService = z.object({
    outsiderId: z.number(),
    gradeId: numberSchema.nullable(),
    position: shortTextSchema.nullable().default(""),
    officeAddress: shortTextSchema.nullable().default(""),
    employerOfficeAddress: shortTextSchema.nullable().default(""),
    bankName: shortTextSchema.nullable().default(""),
    currentSalary: numberSchema.nullable().default(0),
    ITP: numberSchema.nullable().default(0),
    COLA: numberSchema.nullable().default(0),
})

export const _setDirector = z.object({
    id: z.number(),
    directorApproverId: numberSchema,
})