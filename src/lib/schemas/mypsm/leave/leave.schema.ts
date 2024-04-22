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

// ===========================================================
// Revamps
// ===========================================================

// leave endorsment
export const LeaveEndorsementSchema = z.object({
    leaveId: z.number(),
    leaveTypeCode: z.string(),
    remark: z.string(),
    status: z.boolean(),
});

// endorser details
export const LeaveEndorserDetailsSchema = z.object({
    leaveId: z.number(),
    leaveTypeCode: z.string(),
    supporterName: z.string().optional(),
    supporterIC: z.string(),
    approverName: z.string().optional(),
    approverIC: z.string(),
});

// common leave details
export const LeaveCommonDetailsSchema = z.object({
    leaveTypeCode: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    reason: z.string(),
    startHalfDayOption: z.boolean(),
    startHalfDayType: z.string(),
    endHalfDayOption: z.boolean(),
    endHalfDayType: z.string(),
});

// unrecorded leave
export const LeaveUnrecordedDetailsSchema = z.object({
    leaveTypeCode: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    category: z.string(),
    reason: z.string(),
    startHalfDayOption: z.boolean(),
    startHalfDayType: z.string(),
    endHalfDayOption: z.boolean(),
    endHalfDayType: z.string(),
});

// delivery leave
export const LeaveDeliveryDetailsSchema = z.object({
    leaveTypeCode: z.string(),
    expectedDeliveryDate: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    reason: z.string(),
    startHalfDayOption: z.boolean(),
    startHalfDayType: z.string(),
    endHalfDayOption: z.boolean(),
    endHalfDayType: z.string(),
});

// study leave
export const LeaveStudyDetailsSchema = z.object({
    leaveTypeCode: z.string(),
    fieldOfStudy: z.string(),
    institution: z.string(),
    certificationType: z.string(),
    courseName: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    startHalfDayOption: z.boolean(),
    startHalfDayType: z.string(),
    endHalfDayOption: z.boolean(),
    endHalfDayType: z.string(),
    reason: z.string(),
});

export const LeaveEntitlementDetailSchema = z.object({
    entitlement: z.number(),
    carryForward: z.number(),
    balance: z.number(),
    leaveEntitlementTypeId: z.number(),
    used: z.number(),
});
export type LeaveEntitlementDetail = z.infer<typeof LeaveEntitlementDetailSchema>;

export const LeaveEntitlementEditDtoSchema = z.object({
    employeeId: z.number(),
    year: z.number(),
    replacementAnnual: LeaveEntitlementDetailSchema,
    alternateUntracked: LeaveEntitlementDetailSchema,
    halfPay: LeaveEntitlementDetailSchema,
    withoutPay: LeaveEntitlementDetailSchema,
    maternity: LeaveEntitlementDetailSchema,
    paternity: LeaveEntitlementDetailSchema,
    remoteReligious: LeaveEntitlementDetailSchema,
    quarantine: LeaveEntitlementDetailSchema,
    unpaidChildCare: LeaveEntitlementDetailSchema,
    extraCourse: LeaveEntitlementDetailSchema,
    officeAbsent: LeaveEntitlementDetailSchema,
    extendedSick: LeaveEntitlementDetailSchema,
    unpaidPair: LeaveEntitlementDetailSchema,
    cancer: LeaveEntitlementDetailSchema,
    tibi: LeaveEntitlementDetailSchema,
});
export type LeaveEntitlementEditDto = z.infer<
    typeof LeaveEntitlementEditDtoSchema
>;
