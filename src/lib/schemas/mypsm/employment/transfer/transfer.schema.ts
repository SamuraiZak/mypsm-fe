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
    result: z.string(),
    placementId: z.number(),
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
