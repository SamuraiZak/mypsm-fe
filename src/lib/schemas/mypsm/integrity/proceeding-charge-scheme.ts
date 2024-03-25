//==========================================================
//==================== Integrity  ==========================
//==========================================================

import {
    booleanSchema,
    codeSchema,
    dateStringSchema,
    numberSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

// ==================================================
// Proceeding Charge Schema
// ==================================================
export const _proceedingIDSchema = z.object({
    integrityId: z.number().readonly(),
});

export const _proceedingStaffDetailRequestSchema = _proceedingIDSchema.extend({
    employeeId: z.number().readonly(),
});

export const _proceedingEmployeeListSchema = z.object({
    id: z.number().readonly(),
    employeeNumber: z.number().readonly(),
    name: z.string(),
    identityCardNumber: z.string(),
    gradeCode: z.string(),
    positionCode: z.string(),
    placementCode: z.string(),
});

export const _proceedingChargeSchema = z.object({
    integrityId: z.number().readonly(),
    employeeId: z.number().readonly(),
    employeeNumber: z.string(),
    employeeName: z.string(),
    identityCardNumber: z.string(),
    disciplinaryType: z.string(),
    chargeMeetingDate: z.coerce.date(),
    proceedingMeetingDate: z.coerce.date(),
    isAppeal: z.boolean(),
    declarationLetter: z.boolean(),
    status: z.string(),
});

export const _relationDetailSchema = z.object({
    employeeNumber: z.string(),
    fullName: z.string(),
    position: z.string(),
    relationship: z.string(),
});

export const _proceedingEmployeeResponseSchema = z.object({
    employeeNumber: z.string(),
    identityCardNumber: z.string(),
    fullName: z.string(),
    alternativeName: z.null(),
    icColour: z.string(),
    birthDate: z.string(),
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

export const _proceedingServiceResponseSchema = z.object({
    currentGrade: z.string(),
    currentPosition: z.string(),
    placement: z.string(),
    serviceType: z.string(),
    effectiveDate: z.string(),
    retirementBenefit: z.string(),
    EPFNumber: z.string(),
    SOCSO: z.string(),
    taxIncome: z.string(),
    bankName: z.string(),
    accountNumber: z.string(),
    program: z.string(),
    eligibleLeaveCount: z.number(),
    civilServiceStartDate: z.string(),
    confirmServiceDate: z.string(),
    historyList: z.array(z.any()),
    firstEffectiveDate: z.string(),
    pastAttachmentDate: z.string(),
    actingDate: z.string(),
    interimDate: z.string(),
    pensionScheme: z.string(),
    lastSalaryRaiseDate: z.string(),
    lastPromotionDate: z.string(),
    salaryMovementMonth: z.number(),
    retirementDate: z.string(),
    salaryEffectiveDate: z.string(),
    maximumSalary: z.number(),
    baseSalary: z.number(),
    ITKA: z.number(),
    ITP: z.number(),
    EPW: z.number(),
    COLA: z.number(),
});

export const _proceedingStaffDetailResponseSchema = z.object({
    employeeDetail: _proceedingEmployeeResponseSchema,
    serviceDetail: _proceedingServiceResponseSchema,
});

export const _proceedingAccusationSchema = z.object({
    id: z.string().nullable(),
    title: shortTextSchema,
});

export const _proceedingChargeMeetingRequestSchema = z
    .object({
        employeeId: z.number(),
        meetingDate: dateStringSchema,
        meetingName: shortTextSchema,
        meetingCount: numberSchema,
        accusationList: z.array(z.string()),
    })
    .refine((data) => data.accusationList.length > 0, {
        message: 'Tuduhan tidak boleh kosong',
    });

export const _proceedingApproverSchema = z.object({
    integrityId: z.number().readonly(),
    status: booleanSchema,
    remark: shortTextSchema,
});

export const _chargesSchema = z.object({
    integrityId: z.number().readonly(),
    accusationId: z.number(),
    accusationListId: z.number(),
    accusationName: z.string(),
});

export const _chargesListSchema = z.object({
    accusationList: z.array(_chargesSchema),
});

// Sentencing Meeting Schemas
export const _emolumenDateSchema = z.object({
    startDate: dateStringSchema.nullable(),
    endDate: dateStringSchema.nullable(),
});

export const _sentenceSchema = z.object({
    penaltyTypeCode: codeSchema.nullish(),
    effectiveDate: dateStringSchema.nullish(),
    emolumenRight: numberSchema.nullish(),
    duration: numberSchema.nullish(),
    emolumenDate: z.array(_emolumenDateSchema),
    newGradeCode: codeSchema.nullish(),
    salaryMovementCount: numberSchema.nullish(),
    sentencingMonth: codeSchema.nullish(),
});

export const _sentencingListSchema = z
    .object({
        accusationListId: z.number().readonly(),
        result: booleanSchema,
        sentencing: z.array(_sentenceSchema),
    })
    .superRefine(({ result, sentencing }, ctx) => {
        if (result) {
            sentencing.forEach((arr) => {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Tarikh kuatkuasa perlu diisi.',
                    path: ['effectiveDate'],
                });
                if (arr.penaltyTypeCode === '02') {
                    if (arr.emolumenRight === undefined) {
                        ctx.addIssue({
                            code: 'custom',
                            message: 'Hari Emolumen perlu diisi.',
                            path: ['emolumenRight'],
                        });
                    }
                } else if (arr.penaltyTypeCode === '03') {
                    if (arr.emolumenRight === undefined) {
                        ctx.addIssue({
                            code: 'custom',
                            message: 'Hari Emolumen perlu diisi.',
                            path: ['emolumenRight'],
                        });
                    }
                    arr.emolumenDate.forEach((val) => {
                        if (val.startDate === null) {
                            ctx.addIssue({
                                code: 'custom',
                                message: 'Tarikh mula perlu diisi.',
                                path: ['startDate'],
                            });
                        }
                        if (val.endDate === null) {
                            ctx.addIssue({
                                code: 'custom',
                                message: 'Tarikh mula perlu diisi.',
                                path: ['endDate'],
                            });
                        }
                    });
                } else if (arr.penaltyTypeCode === '04') {
                    if (arr.duration === undefined) {
                        ctx.addIssue({
                            code: 'custom',
                            message: 'Tempoh bulan perlu diisi.',
                            path: ['duration'],
                        });
                    }
                } else if (arr.penaltyTypeCode === '05') {
                    if (arr.duration === undefined) {
                        ctx.addIssue({
                            code: 'custom',
                            message: 'Tempoh perlu diisi.',
                            path: ['duration'],
                        });
                    }
                    if (arr.sentencingMonth === undefined) {
                        ctx.addIssue({
                            code: 'custom',
                            message: 'Tempoh Hukuman perlu diisi.',
                            path: ['sentencingMonth'],
                        });
                    }
                } else if (arr.penaltyTypeCode === '06') {
                    if (arr.newGradeCode === undefined) {
                        ctx.addIssue({
                            code: 'custom',
                            message: 'Gred baru perlu diisi.',
                            path: ['newGradeCode'],
                        });
                    }
                }
            });
        }
    });

export const _proceedingSentencingMeetingSchema = z.object({
    integrityId: z.number().readonly(),
    meetingDate: shortTextSchema,
    meetingCount: numberSchema,
    meetingName: shortTextSchema,
    meetingCode: codeSchema,
    meetingResult: z.array(_sentencingListSchema),
});

// suspension meeting schema
export const _proceedingSuspensionSchema = z.object({
    employeeId: z.number().readonly(),
    meetingDate: z.string(),
    meetingName: z.string(),
    meetingCount: z.number(),
    meetingCode: z.string(),
    eligibleEmolumen: z.number(),
    startDate: z.string(),
    endDate: z.string(),
});

// appeal meeting schema
export const _proceedingAppealSchema = z.object({
    integrityId: z.number().readonly(),
    meetingDate: z.string(),
    meetingCount: z.number(),
    meetingName: z.string(),
    meetingCode: codeSchema,
});
