//==========================================================
//================== Fund Application Schema ==============
//==========================================================

import {
    booleanSchema,
    codeSchema,
    dateSchema,
    dateStringSchema,
    numberIdSchema,
    numberSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

// ==================================================
// fund application schema
// ==================================================
export const _fundApplicationIDschema = z.object({
    examId: z.number(),
});

export const _fundApplicationResponseSchema = z.object({
    id: z.number().readonly(),
    employeeName: shortTextSchema,
    employeeIdentityNumber: shortTextSchema,
    courseApplicationDate: dateSchema,
    courseName: shortTextSchema,
    academicLevel: shortTextSchema,
    coursePeriod: numberIdSchema,
    status: z.string().readonly(),
});

export const _fundApplicationListResponseSchema = z.array(
    _fundApplicationResponseSchema,
);

export const _fundApplicationDetailResponseSchema = z.object({
    id: z.number().readonly(),
    academicLevel: shortTextSchema,
    courseName: shortTextSchema,
    institution: shortTextSchema,
    learningInstitution: shortTextSchema,
    studyDuration: numberSchema,
    courseApplicationDate: dateStringSchema,
    entryDateToInstituition: dateStringSchema,
    expectedFinishedStudyDate: dateStringSchema,
    educationTypeId: numberIdSchema,
    applicationTypeId: numberIdSchema,
});

export const _createFundApplicationRequestSchema =
    _fundApplicationDetailResponseSchema.omit({
        id: true,
        courseApplicationDate: true,
    });

// ==================================================
// fund application staff personal info schema
// ==================================================
export const _fundApplicationPersonalInfoResponseSchema = z
    .object({
        employeeNo: z.string(),
        name: shortTextSchema,
        identityCard: shortTextSchema,
        identityCardColor: codeSchema,
        dateOfBirth: dateStringSchema,
        placeOfBirth: codeSchema,
        nationality: codeSchema,
        race: codeSchema,
        religion: codeSchema,
        gender: codeSchema,
        status: codeSchema,
        email: z.string(),
        skim: codeSchema,
        grade: codeSchema,
        position: codeSchema,
        currentPlacement: codeSchema,
        group: codeSchema,
        program: codeSchema,
        homeAddress: z.string().nullable(),
        mailAddress: z.string().nullable(),
        homeNo: z.string().nullable(),
        mobileNo: z.string().nullable(),
        housing: z.string().nullable(),
        houseLoan: z.string().nullable(),
        isExPolice: z.boolean(),
    })
    .partial({
        homeNo: true,
        mobileNo: true,
        housing: true,
        houseLoan: true,
    });

// ==================================================
// fund application staff service info schema
// ==================================================
export const _fundApplicationServiceInfoResponseSchema = z
    .object({
        currentGrade: z.string(),
        currentPosition: z.string(),
        placement: z.string(),
        serviceType: z.string(),
        retirementBenefit: z.string(),
        effectiveDate: dateStringSchema,
        EPFNumber: z.string(),
        SOCSO: z.string(),
        taxIncome: z.string(),
        bankName: z.string(),
        accountNumber: z.string(),
        program: z.string(),
        eligibleLeaveCount: z.number(),
        civilServiceStartDate: dateStringSchema,
        confirmServiceDate: dateStringSchema,
        firstEffectiveDate: dateStringSchema,
        pastAttachmentDate: dateStringSchema,
        actingDate: dateStringSchema,
        interimDate: dateStringSchema,
        pensionScheme: z.string(),
        lastSalaryRaiseDate: dateStringSchema,
        lastPromotionDate: dateStringSchema,
        retirementDate: dateStringSchema,
        salaryEffectiveDate: dateStringSchema,
        maximumSalary: z.number(),
        baseSalary: z.number(),
        ITKA: z.number(),
        ITP: z.number(),
        EPW: z.number(),
        COLA: z.number(),
    })
    .partial({
        bankName: true,
        accountNumber: true,
    });

// ==================================================
// fund application approval schema
// ==================================================
export const _fundApplicationApprovalSchema = z.object({
    id: numberIdSchema,
    remark: shortTextSchema,
    status: booleanSchema,
});

// ==================================================
// fund application document upload schema
// ==================================================
export const _fundApplicationDocumentSchema = z.object({
    id: numberIdSchema,
    document: z.array(z.object({ document: z.string() })),
});
export const _fundApplicationUploadDocSchema = z.object({
    // id: numberIdSchema,
    documents: z
        .instanceof(File, { message: 'Sila muat naik dokumen berkenaan.' })
        .refine((f) => f.size < 4_000_000, 'Maximum 4 MB saiz muat naik.')
        .array(),
});
