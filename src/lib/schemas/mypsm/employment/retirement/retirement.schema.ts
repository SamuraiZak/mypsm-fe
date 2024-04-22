import * as z from 'zod';

// ======================================================
// VOLUNTARY SHARED
// ======================================================
export const RetirementEndorsementSchema = z.object({
    voluntaryId: z.number(),
    status: z.boolean(),
    remark: z.string(),
});
export type RetirementEndorsement = z.infer<typeof RetirementEndorsementSchema>;

export const RetirementEndorserDetailSchema = z.object({
    voluntaryId: z.number(),
    supporter1: z.string(),
    supporter2: z.string(),
    approver: z.string(),
    isReadOnly: z.boolean(),
});
export type RetirementEndorserDetail = z.infer<
    typeof RetirementEndorserDetailSchema
>;

// ======================================================
// VOLUNTARY
// ======================================================
export const RetirementVoluntaryDetailSchema = z.object({
    voluntaryId: z.number().nullish(),
    retirementDate: z.string(),
    newRetirementDate: z.string(),
    reason: z.string(),
});
export type RetirementVoluntaryDetail = z.infer<
    typeof RetirementVoluntaryDetailSchema
>;

// ======================================================
// FORCED
// ======================================================

// ======================================================
// FORCED SHARED
// ======================================================
export const RetirementForcedEndorsementSchema = z.object({
    forceId: z.number(),
    name: z.string().nullish(),
    status: z.boolean(),
    remark: z.string(),
});
export type RetirementForcedEndorsement = z.infer<
    typeof RetirementForcedEndorsementSchema
>;

// ======================================================
// UNSPECIFY
// ======================================================
export const _addListSchema = z.object({
    employeeList:z.number().array()
});


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

export const DetailsSchema = z.object({
    updateList: z.array(UpdateListSchema),
});
export type UpdateDetails = z.infer<typeof DetailsSchema>;

export const UpdateRetirementUnspecifyDetailSchema = z.object({
    details: DetailsSchema,
});
export type UpdateRetirementUnspecifyDetail = z.infer<
    typeof UpdateRetirementUnspecifyDetailSchema
>;

// ======================================================
// UNSPECIFY

export const DocumetnUpdateListSchema = z.object({
    groupId: z.number(),
    employeeId: z.number(),
    remark: z.string(),
    status: z.boolean(),
});
export type DocumentUpdateList = z.infer<typeof UpdateListSchema>;

export const DocumentDetailsSchema = z.object({
    updateList: z.array(UpdateListSchema),
});
export type DocumentDetails = z.infer<typeof DetailsSchema>;

export const DocumentRetirementUnspecifyDetailSchema = z.object({
    details: DetailsSchema,
});
export type DocumentRetirementUnspecifyDetail = z.infer<
    typeof DocumentRetirementUnspecifyDetailSchema
>;
