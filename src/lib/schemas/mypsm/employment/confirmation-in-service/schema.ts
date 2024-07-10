//==========================================================
//================== Confirmation Info Schema ==============
//==========================================================

import {
    booleanSchema,
    codeSchema,
    dateStringSchema,
    numberSchem0,
    shortTextSchema,
} from '$lib/schemas/common/schema-type';
import { z } from 'zod';

//==========================================================
//================== Academic Schema =====================
//==========================================================

export const _confirmationListSchema = z.object({
    id: z.number().readonly(),
    employeeNo: z.string().readonly(),
    employeeName: z.string().readonly(),
    identityDocumentNumber: z.string().readonly(),
    positionByBoard: z.string().readonly(),
    employedDate: z.string().readonly(),
    currentPosition: z.string().readonly(),
    currentPlacement: z.string().readonly(),
    status: z.string().readonly(),
});

export const _confirmationApprovalSchema = z.object({
    id: z.number().readonly(),
    remark: shortTextSchema,
    status: booleanSchema,
    approvalDate: z.boolean().readonly(),
    isReadonly: z.boolean().readonly(),
});

export const _confirmationDiciplinarySchema = z.object({
    diciplinaries: z.array(z.any()),
});

export const _confirmationExaminationSchema = z.object({
    examinations: z.array(z.any()),
});

export const _confirmationPersonalDetailSchema = z.object({
    id: z.number().readonly(),
    genderId: z.number().readonly(),
    nationalityId: z.number().readonly(),
    religionId: z.number().readonly(),
    raceId: z.number().readonly(),
    titleId: z.number().readonly(),
    ethnicId: z.number().readonly(),
    maritalId: z.number().readonly(),
    birthCountryId: z.number().readonly(),
    birthStateId: z.number().readonly(),
    assetDeclarationStatusId: z.number().readonly(),
    name: z.string().readonly(),
    alternativeName: z.string().readonly(),
    identityDocumentNumber: z.string().readonly(),
    email: z.string().readonly(),
    propertyDeclarationDate: z.string().readonly(),
    birthDate: z.string().readonly(),
    isExPoliceOrSoldier: z.boolean(),
    isInternalRelationship: z.boolean(),
    employeeNumber: z.string().readonly(),
    employeeName: z.string().readonly(),
    employeePosition: z.string().readonly(),
    relationshipId: z.number().readonly(),
});

export const _confirmationServiceSchema = z.object({
    gradeId: z.number().readonly(),
    positionId: z.number().readonly(),
    serviceTypeId: z.number().readonly(),
    serviceGroupId: z.number().readonly(),
    placementId: z.number().readonly(),
    unitId: z.number().readonly(),
    employmentStatusId: z.number().readonly(),
    effectiveDate: z.string().readonly(),
    eligibleLeaveCount: z.number().readonly(),
    civilServiceStartDate: z.string().readonly(),
    newRecruitEffectiveDate: z.string().readonly(),
    serviceDate: z.string().readonly(),
    firstServiceDate: z.string().readonly(),
    firstConfirmServiceDate: z.string().readonly(),
    firstEffectiveDate: z.string().readonly(),
    confirmDate: z.string().readonly(),
    retirementDate: z.string().readonly(),
    maximumSalary: z.number().readonly(),
    bankName: z.string().readonly(),
    bankAccount: z.string().readonly(),
});

export const _confirmationMeetingResultSchema = z.object({
    meetingName: codeSchema,
    meetingDate: dateStringSchema,
    confirmedPositionDate: dateStringSchema,
    meetingRemark: shortTextSchema,
    meetingResult: booleanSchema,
    isReadonly: z.boolean().readonly(),
});

export const _updateConfirmationMeetingResultSchema =
    _confirmationMeetingResultSchema.omit({ isReadonly: true }).extend({
        id: z.number().readonly(),
    });

export const _confirmationContractContinuationSchema = z
    .object({
        confirmationId: z.number(),
        isContractContinued: booleanSchema,
        effectiveDate: dateStringSchema,
        contractMonths: numberSchem0,
        isReadonly: z.boolean().readonly(),
    })
    .superRefine(
        ({ isContractContinued, effectiveDate, contractMonths }, ctx) => {
            if (isContractContinued) {
                if (effectiveDate === '' || effectiveDate === 'undefined') {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Tarikh tidak boleh kosong.',
                        path: ['effectiveDate'],
                    });
                }

                if (contractMonths === null || contractMonths < 1) {
                    ctx.addIssue({
                        code: 'custom',
                        message: 'Bulan percubaan tidak boleh kosong.',
                        path: ['contractMonths'],
                    });
                }
            }
        },
    );

export const _confirmationExamsChecklistSchema = z.object({
    confirmationId: z.number(),
    checker: shortTextSchema,
    confirmationExamOneStatus: booleanSchema,
    confirmationExamTwoStatus: booleanSchema,
    confirmationExamThreeStatus: booleanSchema,
    confirmationExamFourStatus: booleanSchema,
    confirmationExamFiveStatus: booleanSchema,
});

export const _confirmationFullDetailSchema = z.object({
    dataType: z.string().readonly(),
    personalDetail: _confirmationPersonalDetailSchema,
    service: _confirmationServiceSchema,
    examination: _confirmationExamsChecklistSchema,
    diciplinary: _confirmationDiciplinarySchema,
    contractContinuation: _confirmationContractContinuationSchema,
    secretary: _confirmationApprovalSchema,
    division: _confirmationApprovalSchema,
    integrity: _confirmationApprovalSchema,
    audit: _confirmationApprovalSchema,
    meeting: _confirmationMeetingResultSchema,
});
