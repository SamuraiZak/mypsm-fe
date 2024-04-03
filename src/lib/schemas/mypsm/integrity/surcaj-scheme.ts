import {
    booleanSchema,
    codeSchema,
    dateStringSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

// ==================================================
// Surcaj Charge Schema
// ==================================================


// export const _surcajIDSchema = z.object({
//     surchargeId: z.number().readonly(),
// });

// export const _surcajStaffDetailRequestSchema = _surcajIDSchema.extend({
//     employeeId: z.number().readonly(),
// });

// export const _surcajChargeSchema = z.object({
//     employeeNumber: z.string(),
//     employeeName: z.string(),
//     identityCardNumber: z.string(),
//     disciplinaryType: z.string(),
//     chargeMeetingDate: z.coerce
//         .date()
//         .transform((value) => value.toLocaleString()),
//     surcajMeetingDate: z.coerce
//         .date()
//         .transform((value) => value.toLocaleString()),
//     isAppeal: z.boolean(),
//     declarationLetter: z.boolean(),
//     status: z.string(),
// });

export const _relationDetailSchema = z.object({
    employeeNumber: z.string(),
    fullName: z.string(),
    position: z.string(),
    relationship: z.string(),
});

export const _surcajEmployeeResponseSchema = z.object({

    employeeNumber: z.string(),
    identityCardNumber: z.string(),
    fullName: z.string(),
    alternativeName: z.null(),
    icColour: z.string(),
    birthDate: z.coerce.date(),
    birthplace: z.string(),
    nationality: z.string(),
    race: z.string(),
    ethnic: z.string(),
    religion: z.string(),
    gender: z.string(),
    marital: z.string(),
    email: z.string(),
    homeAddress: z.string(),
    mailAddress: z.string(),
    houseLoanType: z.string(),
    houseLoan: z.number(),
    vehicleLoan: z.number(),
    isExPolice: z.boolean(),
    isRelatedToLKIM: z.boolean(),
    relationDetail: _relationDetailSchema,
});

export const _surcajServiceResponseSchema = z.object({
    currentGrade: z.string(),
    currentPosition: z.string(),
    placement: z.string(),
    serviceType: z.string(),
    effectiveDate: z.coerce.date(),
    retirementBenefit: z.string(),
    EPFNumber: z.string(),
    SOCSO: z.string(),
    taxIncome: z.string(),
    bankName: z.string(),
    accountNumber: z.string(),
    program: z.string(),
    eligibleLeaveCount: z.number(),
    civilServiceStartDate: z.coerce.date(),
    confirmServiceDate: z.coerce.date(),
    historyList: z.array(z.any()),
    firstEffectiveDate: z.coerce.date(),
    pastAttachmentDate: z.coerce.date(),
    actingDate: z.coerce.date(),
    interimDate: z.coerce.date(),
    pensionScheme: z.string(),
    lastSalaryRaiseDate: z.coerce.date(),
    lastPromotionDate: z.coerce.date(),
    salaryMovementMonth: z.number(),
    retirementDate: z.coerce.date(),
    salaryEffectiveDate: z.coerce.date(),
    maximumSalary: z.number(),
    baseSalary: z.number(),
    ITKA: z.number(),
    ITP: z.number(),
    EPW: z.number(),
    COLA: z.number(),
});

export const _surcajEmployeeDetailViewSchema = z.object(
    {
        employeeDetail: _surcajEmployeeResponseSchema,
        serviceDetail: _surcajServiceResponseSchema,
    }
);

// urusetia can edit
export const _applicationDetail = z.object({

    surchargeId: z.number().readonly(),
    reportDate: dateStringSchema,
    employeeId: z.number(),
    surchargeAction: z.string(),
    remark: z.string(),

})



export const _meetingDetail = z.object({
    surchargeId: z.number().readonly(),
    meetingId: z.number().readonly(),
    meetingType: z.string(),
    meetingCount: z.number(),
    meetingDate: z.string(),
    amount: z.number(),
    paymentType: z.string(),
    duration: z.number(),
    effectiveDate: z.string(),
    meetingResult: z.string(),
    remark: z.string(),
    meetingName: z.string().optional(),
})


export const _confirmationDetail = z.object({
    surchargeId: z.number().readonly(),
    name: z.string(),
    remark: z.string(),
    status: z.string(),
    statusDescription: z.string(),
})