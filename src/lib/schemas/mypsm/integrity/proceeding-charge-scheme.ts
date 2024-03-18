//==========================================================
//==================== Integrity  ==========================
//==========================================================

import {
    booleanSchema,
    codeSchema,
    dateStringSchema,
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
    birthDate: z.string,
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
    effectiveDate: z.string,
    retirementBenefit: z.string(),
    EPFNumber: z.string(),
    SOCSO: z.string(),
    taxIncome: z.string(),
    bankName: z.string(),
    accountNumber: z.string(),
    program: z.string(),
    eligibleLeaveCount: z.number(),
    civilServiceStartDate: z.string,
    confirmServiceDate: z.string,
    historyList: z.array(z.any()),
    firstEffectiveDate: z.string,
    pastAttachmentDate: z.string,
    actingDate: z.string,
    interimDate: z.string,
    pensionScheme: z.string(),
    lastSalaryRaiseDate: z.string,
    lastPromotionDate: z.string,
    salaryMovementMonth: z.number(),
    retirementDate: z.string,
    salaryEffectiveDate: z.string,
    maximumSalary: z.number(),
    baseSalary: z.number(),
    ITKA: z.number(),
    ITP: z.number(),
    EPW: z.number(),
    COLA: z.number(),
});

export const _proceedingStaffDetailResponseSchema = z.object({
    personalDetail: _proceedingEmployeeResponseSchema,
    serviceDetail: _proceedingServiceResponseSchema,
});

export const _proceedingChargeMeetingRequestSchema = z.object({
    employeeId: z.number(),
    meetingDate: dateStringSchema,
    meetingName: shortTextSchema,
    meetingCount: z.number(),
    accusationList: z.array(shortTextSchema),
});

export const _proceedingApproverSchema = z.object({
    integrityId: z.number().readonly(),
    status: booleanSchema,
    remark: shortTextSchema,
});

export const _chargesListSchema = z.object({
    integrityId: z.number().readonly(),
    accusationId: z.number(),
    accusationListId: z.number(),
    accusationName: z.string(),
});

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

export const _proceedingAppealSchema = z.object({
    integrityId: z.number().readonly(),
    meetingDate: z.string(),
    meetingCount: z.number(),
    meetingName: z.string(),
    meetingCode: codeSchema,
});
