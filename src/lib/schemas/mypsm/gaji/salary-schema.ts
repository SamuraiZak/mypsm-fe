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

export const numberSchema = z.number({
    required_error: 'Medan ini hendaklah diisi.',
    invalid_type_error: 'Sila pastikan medan ini ditaip dengan angka',
}).refine(x => x > 0, { message: "Medan ini tidak boleh dibiar kosong." });

// ==================================
// salary movement schema
// ==================================
const employeesListSchema = z.object({
    employeeId: numberSchema,
})
export const _addNewSalaryMovementSchema = z.object({
    id: z.number().nullable(),
    salaryMovementTypeId: numberSchema,
    salaryMovementMonthId: numberSchema,
    meetingName: shortTextSchema.nullable(),
    meetingDate: shortTextSchema.nullable(),
    isPercentage: booleanSchema,
    amount: numberSchema.nullable(),
    isDraft: booleanSchema,
    employees: employeesListSchema.array(),
})

export const _salaryMovementComment = z.object ({
    id: z.number(),
    employeeId: z.number(),
    remarks: shortTextSchema,
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

// ==================================
// salary allowance schema
// ==================================
export const _salaryAllowanceDeductionSchema = z.object({
    id: numberSchema,
    type: shortTextSchema,
    amount: numberSchema,
    remark: shortTextSchema,
    description: shortTextSchema.optional(),
})

const _salaryAllowanceLeaveSchema = z.object({
    type: shortTextSchema,
    code: shortTextSchema,
    fromDate: shortTextSchema,
    toDate: shortTextSchema,
    reason: shortTextSchema,
    status: shortTextSchema,
    totalLeave: numberSchema,
    amount: numberSchema,
    remark: shortTextSchema,
})

export const _salaryAllowancePublicSchema = z.object({
    leaves: _salaryAllowanceLeaveSchema.array(),
    deduction: _salaryAllowanceDeductionSchema.array(),
    isReadonly: z.boolean().optional(),
})

export const _salaryAllowanceActingSchema = z.object({
    acting: z.object({
        id: numberSchema,
        type: shortTextSchema,
        amount: numberSchema,
        remark: shortTextSchema,
        description: shortTextSchema.optional(),
    }).array()
})

export const _addSalaryAllowanceSchema = z.object({
    employeeId: numberSchema,
    year: numberSchema,
    month: numberSchema,
})

export const _salaryAllowanceApprovalSchema = z.object({
    id: numberSchema,
    year: numberSchema,
    month: numberSchema,
    status: booleanSchema,
    remark: shortTextSchema,
    name: z.string().optional(),
})

// ==================================
// final cert schema
// ==================================
const adjustmentSchema = z.object({
    decription: z.string(),
    amount: z.number(),
})

export const _finalCertSchema = z.object({
    employeeId: z.number(),
    allowance: adjustmentSchema.array(),
    deduction: adjustmentSchema.array(),
    isDraft: booleanSchema,
})