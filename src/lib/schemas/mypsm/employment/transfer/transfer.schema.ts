import * as z from 'zod';

export const TransferCommonDetailSchema = z.object({
    applicationType: z.string(),
    employeeIC: z.string(),
    newPlacementId: z.number(),
    transferDate: z.string(),
    reason: z.string(),
});
export type TransferCommonDetail = z.infer<typeof TransferCommonDetailSchema>;

export const TransferCommonMeetingSchema = z.object({
    id: z.number(),
    name: z.string(),
    date: z.string(),
    result: z.boolean(),
    placementId: z.number(),
    programmeId: z.number(),
    effectiveDate: z.string(),
    referenceNo: z.string(),
    referenceDate: z.string(),
    directorIC: z.string(),
});
export type TransferCommonMeeting = z.infer<typeof TransferCommonMeetingSchema>;

export const TransferCommonPostponeApplicationSchema = z.object({
    id: z.number(),
    isPostpone: z.boolean(),
    postponeDate: z.string(),
    reason: z.string(),
});
export type TransferCommonPostponeApplication = z.infer<
    typeof TransferCommonPostponeApplicationSchema
>;

export const TransferCommonPostponeResultSchema = z.object({
    id: z.number(),
    finalEffectiveDate: z.string(),
    approverIC: z.string(),
});
export type TransferCommonPostponeResult = z.infer<
    typeof TransferCommonPostponeResultSchema
>;

export const TransferCommonEndorsementSchema = z.object({
    id: z.number(),
    status: z.boolean(),
    remark: z.string(),
});
export type TransferCommonEndorsement = z.infer<
    typeof TransferCommonEndorsementSchema
>;

export const TransferCommonEndorserDetailSchema = z.object({
    id: z.number(),
    approverIC: z.string(),
    supporterIC: z.string(),
});
export type TransferCommonEndorserDetail = z.infer<
    typeof TransferCommonEndorserDetailSchema
>;

// ================================================
// SELF
// ================================================
// application detail
export const TransferSelfDetailSchema = z.object({
    transferType: z.string(),
    firstChoiceId: z.number(),
    secondChoiceId: z.number(),
});
export type TransferSelfDetail = z.infer<typeof TransferSelfDetailSchema>;

// optional detail
export const TransferSelfReasonPartnerDetailSchema = z.object({
    distance: z.number(),
    company: z.string(),
    date: z.string(),
});
export type TransferSelfReasonPartnerDetail = z.infer<
    typeof TransferSelfReasonPartnerDetailSchema
>;

export const TransferSelfReasonSchema = z.object({
    id: z.number(),
    reasonId: z.number(),
    explanation: z.string(),
    distance: z.number().nullish(),
    company: z.string().nullish(),
    date: z.string().nullish(),
});
export type TransferSelfReason = z.infer<typeof TransferSelfReasonSchema>;

export const TransferSelfEndorsementSchema = z.object({
    id: z.number(),
    confirmation: z.boolean(),
    applicationDate: z.string().nullish(),
});
export type TransferSelfEndorsement = z.infer<
    typeof TransferSelfEndorsementSchema
>;
