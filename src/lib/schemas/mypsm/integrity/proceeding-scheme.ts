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
    identityDocumentNumber: z.string(),
    gradeCode: z.string(),
    position: z.string(),
    placement: z.string(),
});

export const _proceedingChargeSchema = z.object({
    integrityId: z.number().readonly(),
    employeeId: z.number().readonly(),
    employeeNumber: z.string(),
    employeeName: z.string(),
    identityDocumentNumber: z.string(),
    disciplinaryType: z.string(),
    chargeMeetingDate: z.coerce.date(),
    chargeMeetingResult: z.string(),
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
    identityDocumentNumber: z.string(),
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
    approvalDate: z.string().readonly(),
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
        result: z.boolean(),
        sentencing: z.array(_sentenceSchema),
    })
    .superRefine(({ result, sentencing }, ctx) => {
        if (result) {
            sentencing.forEach((arr) => {
                if (arr.effectiveDate === undefined) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Tarikh kuatkuasa perlu diisi.',
                        path: ['effectiveDate'],
                    });
                }
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
                    if (arr.salaryMovementCount === undefined) {
                        ctx.addIssue({
                            code: 'custom',
                            message: 'Tempoh perlu diisi.',
                            path: ['salaryMovementCount'],
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
    employeeId: z.number().readonly(),
    meetingDate: shortTextSchema,
    meetingCount: numberSchema,
    meetingName: shortTextSchema,
    meetingCode: codeSchema,
    meetingResult: z.array(_sentencingListSchema),
});

// appeal meeting schema
export const _proceedingAppealSchema = z
    .object({
        integrityId: z.number().readonly(),
        meetingDate: shortTextSchema,
        meetingCount: numberSchema,
        meetingName: shortTextSchema,
        meetingCode: codeSchema,
        meetingResult: booleanSchema,
        appealResult: shortTextSchema.nullable(),
        result: z.array(_sentencingListSchema),
    })
    .superRefine(({ meetingResult, appealResult }, ctx) => {
        if (meetingResult) {
            if (appealResult === null) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Sila pilih satu pilihan.',
                    path: ['appealResult'],
                });
            }
        }
    });

export const _proceedingTypeChargeDetailsSchema = z.object({
    accusationList: _proceedingChargeMeetingRequestSchema,
    confirmation: _proceedingApproverSchema,
    sentencingDetails: _proceedingSentencingMeetingSchema,
    sentencingConfirmation: _proceedingApproverSchema,
    appealDetails: _proceedingAppealSchema,
    appealConfirmation: _proceedingApproverSchema,
});

export const _proceedingSuspensionListSchema = z.object({
    integrityId: z.number(),
    employeeId: z.number(),
    employeeNumber: z.string(),
    employeeName: z.string(),
    identityDocumentNumber: z.string(),
    disciplinaryType: z.string(),
    suspendMeetingResult: z.string(),
    suspendMeetingDate: z.string(),
    isAppeal: z.boolean(),
    declarationLetter: z.boolean(),
    status: z.string(),
});

export const _proceedingSuspensionCriminalDetailSchema = z
    .object({
        integrityId: z.number().readonly(),
        proceedingAction: z.string().min(1, { message: 'Sila buat pilihan.' }),
        eligibleEmolumen: numberSchema.nullish(),
        startDate: dateStringSchema.nullish(),
        meetingDate: dateStringSchema.nullish(),
        meetingName: shortTextSchema.nullish(),
        meetingCount: numberSchema.nullish(),
        meetingCode: codeSchema.nullish(),
        meetingResult: _sentencingListSchema,
    })
    .superRefine(
        (
            {
                proceedingAction,
                startDate,
                meetingDate,
                meetingCount,
                meetingName,
                meetingCode,
                meetingResult,
            },
            ctx,
        ) => {
            if (proceedingAction === 'Rayuan dikemukakan') {
                if (startDate === null || startDate === undefined) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Tarikh perlu diisi.',
                        path: ['startDate'],
                    });
                }
            } else if (proceedingAction === 'Prosiding Penentu Hukuman') {
                if (meetingDate === null || meetingDate === undefined) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Tarikh perlu diisi.',
                        path: ['meetingDate'],
                    });
                }
                if (meetingCount === null || meetingCount === undefined) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Medan ini perlu diisi.',
                        path: ['meetingCount'],
                    });
                }
                if (meetingName === null || meetingName === undefined) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Medan ini perlu diisi.',
                        path: ['meetingName'],
                    });
                }
                if (meetingCode === null || meetingCode === undefined) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Medan ini perlu diisi.',
                        path: ['meetingCode'],
                    });
                }
                if (meetingResult === null || meetingResult === undefined) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Medan ini perlu diisi.',
                        path: ['meetingResult'],
                    });
                }
            }
        },
    );

export const _proceedingSuspensionCriminalCancelSchema = z.object({
    integrityId: z.number().readonly(),
    cancelSuspend: booleanSchema,
});

// suspend meeting schema
export const _proceedingSuspensionSchema = z
    .object({
        employeeId: z.number().readonly(),
        meetingDate: dateStringSchema.nullable(),
        meetingName: shortTextSchema,
        meetingCount: numberSchema,
        meetingCode: codeSchema,
        suspendMeetingResult: booleanSchema,
        suspensionType: codeSchema.nullable(), // two types
        startDate: dateStringSchema.nullish(),
        endDate: dateStringSchema.nullish(),
        eligibleEmolumen: numberSchema.nullish(),
    })
    .superRefine(
        (
            {
                suspendMeetingResult,
                meetingDate,
                suspensionType,
                endDate,
                startDate,
            },
            ctx,
        ) => {
            if (meetingDate === null) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Tarikh perlu diisi.',
                    path: ['meetingDate'],
                });
            }
            if (suspendMeetingResult) {
                if (suspensionType === null) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Sila pilih satu pilihan.',
                        path: ['suspensionType'],
                    });
                }
                if (startDate === null || startDate === undefined) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Tarikh perlu diisi.',
                        path: ['startDate'],
                    });
                }
                if (suspensionType === 'penyiasatan') {
                    if (endDate === null || endDate === undefined) {
                        ctx.addIssue({
                            code: 'custom',
                            message: 'Tarikh perlu diisi.',
                            path: ['endDate'],
                        });
                    }
                }
            }
        },
    );

// suspend meeting schema
export const _proceedingSuspensionViewSchema = z.object({
    integrityId: z.number().readonly(),
    employeeId: z.number().readonly(),
    meetingDate: dateStringSchema.nullable(),
    meetingName: shortTextSchema,
    meetingCount: numberSchema,
    meetingCode: codeSchema,
    suspendMeetingResult: booleanSchema,
    suspensionType: codeSchema.nullable(), // two types
    startDate: dateStringSchema.nullish(),
    endDate: dateStringSchema.nullish(),
    eligibleEmolumen: numberSchema.nullish(),
    confirmation: _proceedingApproverSchema,
    editCriminalDetail: _proceedingSuspensionCriminalDetailSchema,
    cancelCriminalDetail: _proceedingSuspensionCriminalCancelSchema,
});
