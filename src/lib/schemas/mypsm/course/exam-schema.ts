//==========================================================
//================== Course Schema ==============
//==========================================================

import {
    booleanSchema,
    codeSchema,
    dateStringSchema,
    longTextSchema,
    numberIdSchema,
    requiredDateStringSchema,
    requiredTextSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

// ==================================================
// exam info schema
// ==================================================
export const _examIDschema = z.object({
    examId: z.number(),
});

export const _examInfoResponseSchema = z.object({
    id: z.number().readonly(),
    examTypeId: numberIdSchema,
    examTitle: codeSchema,
    startDate: dateStringSchema,
    endDate: dateStringSchema,
    examDate: dateStringSchema,
    examLocation: longTextSchema,
});

export const _examInfoRequestSchema = _examInfoResponseSchema.omit({
    id: true,
});

export const _editExamInfoRequestSchema = _examInfoResponseSchema;

export const _examListResponseSchema = z.array(_examInfoResponseSchema);

// ==================================================
// exam application schema
// ==================================================
export const _addExamApplicationRequestSchema = z.object({
    exams: z.array(_examIDschema),
});

export const _examApplicationInfoResponseSchema = z.object({
    applicationId: z.number().readonly(),
    employeeNumber: z.string().readonly(),
    employeeName: shortTextSchema,
    identityDocumentNumber: shortTextSchema,
    employeeGrade: codeSchema,
    examTitle: codeSchema,
    examTypeId: numberIdSchema,
    examApplicationOpenDate: requiredDateStringSchema,
    examApplicationCloseDate: requiredDateStringSchema,
    examDate: requiredDateStringSchema,
    examLocation: shortTextSchema,
    examResult: shortTextSchema.nullish(),
    examStatus: codeSchema,
});

export const _examApplicationListResponseSchema = z.array(
    _examApplicationInfoResponseSchema,
);

export const _examApplicationDetailResponseSchema =
    _examApplicationInfoResponseSchema
        .omit({
            examTypeId: true,
            examResult: true,
            examStatus: true,
        })
        .extend({
            examType: shortTextSchema,
        });

// ==================================================
// course staff personal info schema
// ==================================================
export const _coursePersonalInfoResponseSchema = z
    .object({
        employeeNo: z.string(),
        name: shortTextSchema,
        identityDocumentNumber: shortTextSchema,
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
// course staff service info schema
// ==================================================
export const _courseServiceInfoResponseSchema = z
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
// course exam attendance schema
// ==================================================
export const _examSetAttendanceResponseSchema = z.object({
    status: numberIdSchema,
    details: shortTextSchema,
});

export const _examSetAttendanceRequestSchema = z.object({
    id: numberIdSchema,
    attendance: z.boolean(),
});

// ==================================================
// course exam approval schema
// ==================================================
export const _examApplicationApprovalSchema = z.object({
    id: numberIdSchema,
    remark: codeSchema,
    status: booleanSchema,
    approvalDate: z.string(),
});

// ==================================================
// course exam result schema
// ==================================================
export const _examApplicationResultResponseSchema = z.object({
    id: numberIdSchema,
    examTitle: shortTextSchema,
    examRemark: shortTextSchema,
    examResult: requiredTextSchema,
});

export const _examApplicationResultRequestSchema =
    _examApplicationResultResponseSchema.omit({ examTitle: true });
