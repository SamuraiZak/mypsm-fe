//==========================================================
//================== Confirmation Info Schema ==============
//==========================================================

import { z } from 'zod';

//==========================================================
//================== Academic Schema =====================
//==========================================================

export const _confirmationListSchema = z.object({
    id: z.number().readonly(),
    employeeNo: z.string().readonly(),
    employeeName: z.string().readonly(),
    identityCardNo: z.string().readonly(),
    positionByBoard: z.string().readonly(),
    employedDate: z.string().readonly(),
    currentPosition: z.string().readonly(),
    currentPlacement: z.string().readonly(),
    status: z.string().readonly(),
});

export const _confirmationApprovalSchema = z.object({
    id: z.number(),
    name: z.null().optional(),
    remark: z.null(),
    status: z.null(),
});

export const _confirmationDiciplinarySchema = z.object({
    diciplinaries: z.array(z.any()),
});

export const _confirmationExaminationSchema = z.object({
    examinations: z.array(z.any()),
});

export const _confirmationPersonalDetailSchema = z.object({
    id: z.number(),
    genderId: z.number(),
    nationalityId: z.number(),
    religionId: z.number(),
    raceId: z.number(),
    titleId: z.number(),
    ethnicId: z.number(),
    maritalId: z.number(),
    birthCountryId: z.number(),
    birthStateId: z.number(),
    assetDeclarationStatusId: z.number(),
    name: z.string(),
    alternativeName: z.string(),
    identityDocumentNumber: z.string(),
    email: z.string(),
    propertyDeclarationDate: z.coerce.date(),
    birthDate: z.coerce.date(),
    isExPoliceOrSoldier: z.boolean(),
    isInternalRelationship: z.boolean(),
    employeeNumber: z.string(),
    employeeName: z.string(),
    employeePosition: z.string(),
    relationshipId: z.null(),
});

export const _confirmationServiceSchema = z.object({
    gradeId: z.number(),
    positionId: z.number(),
    serviceTypeId: z.number(),
    serviceGroupId: z.number(),
    placementId: z.number(),
    unitId: z.number(),
    employmentStatusId: z.number(),
    effectiveDate: z.coerce.date(),
    eligibleLeaveCount: z.number(),
    civilServiceStartDate: z.coerce.date(),
    newRecruitEffectiveDate: z.coerce.date(),
    serviceDate: z.coerce.date(),
    firstServiceDate: z.coerce.date(),
    firstConfirmServiceDate: z.coerce.date(),
    firstEffectiveDate: z.coerce.date(),
    confirmDate: z.coerce.date(),
    retirementDate: z.coerce.date(),
    maximumSalary: z.number(),
    bankName: z.string(),
    bankAccount: z.string(),
});

export const _confirmationMeetingResultSchema = z.object({
    meetingDate: z.string(),
    meetingCount: z.string(),
    meetingName: z.string(),
    meetingResult: z.boolean(),
});

export const _confirmationFullDetailSchema = z.object({
    personalDetail: _confirmationPersonalDetailSchema,
    service: _confirmationServiceSchema,
    examination: _confirmationExaminationSchema,
    diciplinary: _confirmationDiciplinarySchema,
    integrity: _confirmationApprovalSchema,
    audit: _confirmationApprovalSchema,
    division: _confirmationApprovalSchema,
});
