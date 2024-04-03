import {
    booleanSchema,
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

export const numberSchema = z.coerce.number({
    required_error: 'Medan ini hendaklah diisi.',
    invalid_type_error: 'Sila pastikan medan ini ditaip dengan angka',
}).refine(x => x > 0, { message: "Medan ini tidak boleh dibiar kosong." });
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
const optionalNumberSchema = z.number().refine(x => x > 0, { message: "Sila tetapkan pilihan anda." }).nullable().default(null);
const optionalTextSchema = z.string().min(4, { message: "Medan hendaklah lebih dari 4 karakter." }).nullable().default(null);
const maxTextSchema = z
.string({ required_error: 'Medan ini tidak boleh kosong.', invalid_type_error: 'Medan ini tidak boleh kosong.' })
.max(32, {
    message: 'Medan ini tidak boleh melebihi 32 karakter.',
})
.trim()

// ==================================
// salary movement schema
// ==================================
const employeesListSchema = z.object({
    employeeId: numberSchema,
})
export const _addNewSalaryMovementSchema = z.object({
    meetingName:         z.string(),
    meetingDate:         stringToMinDate,
    salaryMovementMonth: numberSchema,
    specialAid:          numberSchema,
    specialRaiseType:    z.string(),
    specialRaise:        numberSchema,
    employees:           employeesListSchema.array(),
})

export const _directorApprovalSchema = z.object({
    id: numberSchema,
    name: shortTextSchema.optional(),
    remark: shortTextSchema,
    status: booleanSchema,
})

// ==================================
// final payslip schema
// ==================================
export const _finalPayslipSchema = z.object({
    id: z.number(),
})