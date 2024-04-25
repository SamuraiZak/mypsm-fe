import * as z from 'zod';

export const UpdateListSchema = z.object({
    groupId: z.number(),
    employeeId: z.number(),
    employeeNumber: z.string(),
    employeeName: z.string(),
    identityCardNumber: z.string(),
    retirementTypeId: z.number(),
    retirementDate: z.string(),
});
export type UpdateList = z.infer<typeof UpdateListSchema>;

export const RetirementOtherDetailSchema = z.object({
    updateList: z.array(UpdateListSchema),
});
export type RetirementOtherDetail = z.infer<typeof RetirementOtherDetailSchema>;

// ======================================
// REVAMPS
// ======================================
// retirement detail
export const UspRetirementDetailSchema = z.object({
    groupId: z.number(),
    employeeId: z.number(),
    retirementTypeId: z.number(),
    retirementDate: z.string(),
});
export type UspRetirementDetail = z.infer<typeof UspRetirementDetailSchema>;

// document approval
export const UspRetirementDocumentApprovalSchema = z.object({
    groupId: z.number(),
    employeeId: z.number(),
    remark: z.string(),
    status: z.boolean(),
});
export type UspRetirementDocumentApproval = z.infer<
    typeof UspRetirementDocumentApprovalSchema
>;


