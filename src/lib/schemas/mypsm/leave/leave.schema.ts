import * as z from 'zod';

export const SchemaLeaveEndorsement = z.object({
    leaveId: z.number(),
    status: z.boolean(),
    remark: z.string(),
});

// unrecorded leave
export const SchemaUnrecordedLeave = z
    .object({
        startDate: z.string(),
        endDate: z.string(),
        untrackedLeaveTypeCode: z.string(),
        reason: z.string(),
        halfDayOption: z.boolean(),
        halfDayType: z.string().nullish(),
    })
    .superRefine((values, ctx) => {
        if (values.halfDayOption === true && !values.halfDayType) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Ruangan ini tidak boleh dibiarkan kosong',
                path: ['halfDayType'],
            });
        }
    });

// extended sick leave
export const SchemaExtendedSickLeave = z
    .object({
        startDate: z.string(),
        endDate: z.string(),
        reason: z.string(),
        halfDayOption: z.boolean(),
        halfDayType: z.string().nullish(),
    })
    .superRefine((values, ctx) => {
        if (values.halfDayOption === true && !values.halfDayType) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Ruangan ini tidak boleh dibiarkan kosong',
                path: ['halfDayType'],
            });
        }
    });

// half pay leave
export const SchemaHalfPayLeave = z
    .object({
        startDate: z.string(),
        endDate: z.string(),
        reason: z.string(),
        halfDayOption: z.boolean(),
        halfDayType: z.string().nullish(),
    })
    .superRefine((values, ctx) => {
        if (values.halfDayOption === true && !values.halfDayType) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Ruangan ini tidak boleh dibiarkan kosong',
                path: ['halfDayType'],
            });
        }
    });
