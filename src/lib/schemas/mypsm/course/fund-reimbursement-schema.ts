//==========================================================
//================== Fund Reimbursement Schema ==============
//==========================================================

import {
    booleanSchema,
    codeSchema,
    dateStringSchema,
    numberIdSchema,
    numberSchema,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

// ==================================================
// fund reimbursement schema
// ==================================================
export const _fundReimbursementIDschema = z.object({
    examId: z.number(),
});

export const _fundReimbursementResponseSchema = z.object({
    id: z.number().readonly(),
    employeeName: shortTextSchema,
    identityDocumentNumber: shortTextSchema,
    courseName: shortTextSchema,
    academic: shortTextSchema,
    courseApplicationDate: dateStringSchema,
    studyDuration: numberSchema,
    LNPTAverage: z.number(),
    totalClaim: z.number(),
    status: z.string().readonly(),
    isDraft: z.boolean(),
});

export const _fundReimbursementListResponseSchema = z.array(
    _fundReimbursementResponseSchema,
);

export const _fundReimbursementDetailResponseSchema =
    _fundReimbursementResponseSchema
        .pick({
            id: true,
            courseName: true,
            courseApplicationDate: true,
            studyDuration: true,
            totalClaim: true,
            status: true,
            isDraft: true,
        })
        .extend({
            academicLevel: shortTextSchema,
            institution: shortTextSchema,
            learningInstitution: shortTextSchema,
            semester: numberSchema,
            entryDateToInstituition: dateStringSchema,
            finishedStudyDate: dateStringSchema,
            finalResult: codeSchema,
        });

export const _createFundReimbursementRequestSchema =
    _fundReimbursementDetailResponseSchema.pick({
        id: true,
        academicLevel: true,
        courseName: true,
        institution: true,
        learningInstitution: true,
        studyDuration: true,
        semester: true,
        entryDateToInstituition: true,
        finishedStudyDate: true,
        finalResult: true,
        totalClaim: true,
        isDraft: true,
    });

export const _uploadDocumentsSchema = z.object({
    document: z
        .instanceof(File, { message: 'Sila muat naik dokumen berkenaan.' })
        .refine((f) => f.size < 10_000_000, 'Maximum 10 MB saiz muat naik.')
        .nullish(),
    // .array(),
});

// ==================================================
// fund reimbursement staff personal info schema
// ==================================================
export const _fundReimbursementPersonalInfoResponseSchema = z
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
// fund reimbursement staff service info schema
// ==================================================
export const _fundReimbursementServiceInfoResponseSchema = z
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
// fund reimbursement approval schema
// ==================================================
export const _fundReimbursementApprovalSchema = z.object({
    id: numberIdSchema,
    remark: shortTextSchema,
    status: booleanSchema,
    approvalDate: z.string().readonly(),
    isDraft: z.boolean(),
});

// ==================================================
// fund reimbursement document upload schema
// ==================================================
export const _fundReimbursementDocumentSchema = z.object({
    document: z.array(z.object({ name: z.string(), document: z.string() })),
});
export const _fundReimbursementUploadDocSchema = z.object({
    // id: numberIdSchema,
    isDraft: z.boolean(),
    documents: z
        .instanceof(File, { message: 'Sila muat naik dokumen berkenaan.' })
        .refine((f) => f.size < 10_000_000, 'Maximum 10 MB saiz muat naik.')
        .array()
        .min(1, { message: 'Dokumen berkenaan hendaklah dimuat naik.' }),
});
