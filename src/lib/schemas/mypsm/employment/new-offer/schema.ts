import {
    codeSchema,
    dateStringSchema,
    numberIdSchema,
    numberSchema,
    numberToStringSchema,
    requiredDateStringSchema,
} from '$lib/schemas/common/schema-type';
import * as z from 'zod';

export const _meetingResultEmployeeSchema = z.object({
    employeeNumber: z.string(),
    employeeName: z.string(),
    remarks: z.string(),
    status: z.boolean(),
    approvalDate: z.string().readonly(),
});

export const _approverSchema = z.object({
    id: z.number(),
    name: z.string(),
    results: z.array(_meetingResultEmployeeSchema),
    isReadonly: z.boolean().readonly(),
});

export const _setApproverResultSchema = _approverSchema.omit({
    name: true,
    isReadonly: true,
});

export const _createMeetingBatchSchema = z.object({
    meetingGroupName: codeSchema,
    meetingDate: requiredDateStringSchema,
    employees: z.array(z.object({ employeeId: z.number() })),
});

export const _newOfferMeetingListSchema = z.object({
    meetingId: z.number().readonly(),
    meetingNo: z.number().readonly(),
    totalEmployee: z.string().readonly(),
    meetingName: z.string().readonly(),
    meetingDate: z.string().readonly(),
    status: z.string().readonly(),
});

export const _includedEmployeeEmployeeSchema = z.object({
    employeeNumber: z.string(),
    employeeName: z.string(),
    identityDocumentNumber: z.string(),
    grade: z.string(),
    position: z.string(),
    educationLevel: z.string(),
    eligibleLeaveCount: z.number(),
});

export const _includedEmployeeDetailEmployeeSchema = z.object({
    employeeNumber: z.string(),
    employeeName: z.string(),
    alternativeName: z.null(),
    workStatus: z.string(),
    identityDocumentNumber: z.string(),
    birthDate: dateStringSchema,
    birthCountry: z.string(),
    birthState: z.string(),
    nationality: z.string(),
    race: z.string(),
    religion: z.string(),
    gender: z.string(),
    marital: z.string(),
    email: z.string(),
    homeNumber: z.null(),
    phoneNumber: z.string(),
    eligibleLeaveCount: z.number(),
    isExPoliceOrSoldier: z.boolean(),
    isInternalRelationship: z.boolean(),
    relationEmployeeNumber: z.null(),
    relationName: z.null(),
    relationPosition: z.null(),
    relationship: z.null(),
});

export const _processEmployeeSchema = z.object({
    employeeNumber: z.string().readonly(),
    employeeName: z.string().readonly(),
    gradeId: numberIdSchema,
    maxGradeId: numberIdSchema,
    positionId: numberIdSchema,
    placementId: numberIdSchema,
    serviceTypeId: numberIdSchema.default(2),
    serviceGroupId: numberIdSchema,
    unitId: numberIdSchema,
    employmentStatusId: numberIdSchema,
    effectiveDate: dateStringSchema,
    retirementBenefit: codeSchema,
    epfNumber: numberToStringSchema,
    socsoNumber: numberToStringSchema,
    incomeNumber: numberToStringSchema,
    bankName: numberToStringSchema,
    bankAccount: numberToStringSchema,
    eligibleLeaveCount: numberSchema,
    civilServiceStartDate: dateStringSchema,
    newRecruitEffectiveDate: dateStringSchema,
    serviceDate: dateStringSchema,
    firstServiceDate: dateStringSchema,
    firstConfirmServiceDate: dateStringSchema,
    firstEffectiveDate: dateStringSchema,
    firstEffectiveServiceDate: dateStringSchema,
    confirmServiceDate: dateStringSchema,
    confirmDate: dateStringSchema,
    pensionNumber: z.string().nullish(),
    kgt: numberSchema,
    retirementDate: dateStringSchema,
    revisionMonth: codeSchema,
    maximumSalary: numberSchema,
    baseSalary: numberSchema,
    itka: numberSchema,
    itp: numberSchema,
    epw: numberSchema,
    cola: numberSchema,
});

export const _createProcessSchema = z.object({
    meetingId: z.number(),
    employees: _processEmployeeSchema,
});

export const _supporterApproverSchema = z.object({
    supporterId: numberIdSchema,
    approverId: numberIdSchema,
    isReadonly: z.boolean().readonly(),
});

export const _setSupporterApproverSchema = _supporterApproverSchema
    .omit({ isReadonly: true })
    .extend({
        meetingId: z.number().readonly(),
    });

export const _createSupporterApproverSchema = _supporterApproverSchema
    .omit({ isReadonly: true })
    .extend({
        meetingId: z.number(),
    });

export const _includedEmployeeSchema = z.object({
    employees: z.array(_includedEmployeeEmployeeSchema),
});

export const _includedEmployeeDetailSchema = z.object({
    employees: z.array(_includedEmployeeDetailEmployeeSchema),
});

export const _meetingResultSchema = z.object({
    meetingNo: z.number().readonly(),
    meetingName: z.string().readonly(),
    totalEmployee: z.number().readonly(),
    meetingDate: z.string().readonly(),
    employees: z.array(_meetingResultEmployeeSchema),
    isReadonly: z.boolean().readonly(),
});

export const _updateMeetingResultSchema = z.object({
    meetingId: z.number().readonly(),
    employees: z.array(_meetingResultEmployeeSchema),
});

export const _processSchema = z.object({
    employees: z.array(_processEmployeeSchema),
    isReadonly: z.boolean().readonly(),
});

export const _updateProcessSchema = z.object({
    meetingId: z.number().readonly(),
    employees: z.array(_processEmployeeSchema),
});

export const _newOfferFullDetailSchemaSchema = z.object({
    includedEmployee: _includedEmployeeSchema,
    includedEmployeeDetail: _includedEmployeeDetailSchema,
    meetingResult: _meetingResultSchema,
    process: _processSchema,
    setSupporterApprover: _supporterApproverSchema,
    supporter: _approverSchema,
    approver: _approverSchema,
});
