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
    approvalDate: z.string().readonly().nullable(),
});

export const _approverSchema = z.object({
    applicationId: z.number().readonly(),
    name: z.string().readonly(),
    identityDocumentNumber: z.string().readonly(),
    employees: z.array(_meetingResultEmployeeSchema),
    isReadonly: z.boolean().readonly(),
    isDraft: z.boolean(),
});

export const _setApproverResultSchema = _approverSchema.omit({
    name: true,
    isReadonly: true,
});

export const _createMeetingBatchSchema = z.object({
    applicationId: z.number().nullable(),
    meetingGroupName: codeSchema,
    meetingDate: requiredDateStringSchema,
    employees: z.array(z.object({ employeeId: z.number() })),
    isDraft: z.boolean(),
});

export const _newOfferMeetingListSchema = z.object({
    applicationId: z.number().readonly(),
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
    currentGrade: z.string(),
    currentPosition: z.string(),
    currentPlacement: z.string(),
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
    currentGradeId: numberIdSchema,
    gradeId: numberIdSchema,
    maxGradeId: numberIdSchema,
    placementId: numberIdSchema,
    serviceTypeId: numberIdSchema.default(2),
    serviceGroupId: numberIdSchema,
    unitId: numberIdSchema,
    effectiveDate: dateStringSchema, //
    civilServiceStartDate: z.string().nullish(), //
    serviceDate: z.string().nullish(), //
    kgt: z.number().nullish(),
    revisionMonth: z.string().nullish(),
    maximumSalary: z.number().nullish(),
    baseSalary: z.number().nullish(),
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
    isDraft: z.boolean(),
});

export const _setSupporterApproverSchema = _supporterApproverSchema
    .omit({ isReadonly: true })
    .extend({
        applicationId: z.number().readonly(),
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
    isDraft: z.boolean(),
});

export const _updateMeetingResultSchema = z.object({
    applicationId: z.number().readonly(),
    employees: z.array(_meetingResultEmployeeSchema),
    isDraft: z.boolean(),
});

export const _processSchema = z.object({
    employees: z.array(_processEmployeeSchema),
    isReadonly: z.boolean().readonly(),
    isDraft: z.boolean(),
});

export const _updateProcessSchema = z.object({
    applicationId: z.number().readonly(),
    employees: z.array(_processEmployeeSchema),
    isDraft: z.boolean(),
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
