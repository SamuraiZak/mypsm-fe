import * as z from 'zod';

export const LeaveStudyRequestSchema = z.object({
    applicationId: z.number().optional(),
    leaveTypeCode: z.string(),
    startDate: z.string(),
    durationDays: z.number(),
    academicQualification: z.string(),
    professionalQualification: z.string(),
    letterDateNumber: z.string(),
    course: z.string(),
    institution: z.string(),
    reason: z.string(),
    isDraft: z.boolean(),
    applicationDate: z.string(),
});
export type LeaveStudyRequestDTO = z.infer<typeof LeaveStudyRequestSchema>;

export const LeaveAbsenceRequestSchema = z.object({
    applicationId: z.number().optional(),
    leaveTypeCode: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    reason: z.string(),
    isDraft: z.boolean(),
    applicationDate: z.string(),
});
export type LeaveAbsenceRequestDTO = z.infer<typeof LeaveAbsenceRequestSchema>;
