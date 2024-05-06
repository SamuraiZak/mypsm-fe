import * as z from 'zod';
// ============================================================
// Allowance Detail By Type
// ============================================================

// 1. Ceremony Clothing
export const AllowanceDetailCeremonyClothingSchema = z.object({
    allowanceTypeCode: z.string(),
    reason: z.string(),
    personal: z.number(),
    partner: z.number(),
});
export type AllowanceDetailCeremonyClothing = z.infer<
    typeof AllowanceDetailCeremonyClothingSchema
>;

// 2. Warm Clothing
export const AllowanceDetailWarmClothingSchema = z.object({
    allowanceTypeCode: z.string(),
    reason: z.string(),
    personal: z.number(),
    partner: z.number(),
});
export type AllowanceDetailWarmClothing = z.infer<
    typeof AllowanceDetailWarmClothingSchema
>;

// 3. Hometown Visit
export const AllowanceDetailHometownVisitFamilyDetailSchema = z.object({
    name: z.string(),
    age: z.number(),
    relationshipCode: z.string(),
});
export type AllowanceDetailHometownVisitFamilyDetail = z.infer<
    typeof AllowanceDetailHometownVisitFamilyDetailSchema
>;

export const AllowanceDetailHometownVisitSchema = z.object({
    allowanceTypeCode: z.string(),
    applyCode: z.string(),
    stateCode: z.string(),
    familyDetail: z.array(AllowanceDetailHometownVisitFamilyDetailSchema),
});
export type AllowanceDetailHometownVisit = z.infer<
    typeof AllowanceDetailHometownVisitSchema
>;

// 4. Funeral Fund
export const AllowanceDetailFuneralFundSchema = z.object({
    allowanceTypeCode: z.string(),
    identityCardNumber: z.string(),
    deathDate: z.string(),
    deathTime: z.string(),
});
export type AllowanceDetailFuneralFund = z.infer<
    typeof AllowanceDetailFuneralFundSchema
>;

// 5. Welfare Fund
export const AllowanceDetailWelfareFundSchema = z.object({
    allowanceTypeCode: z.string(),
    welfareTypeCode: z.string(),
});
export type AllowanceDetailWelfareFund = z.infer<
    typeof AllowanceDetailWelfareFundSchema
>;

// 6. House Moving
export const AllowanceDetailHouseMovingSchema = z.object({
    allowanceTypeCode: z.string(),
    movingDate: z.string(),
    oldAddress: z.string(),
    newAddress: z.string(),
});
export type AllowanceDetailHouseMoving = z.infer<
    typeof AllowanceDetailHouseMovingSchema
>;

// 7. Passport Claim
export const AllowanceDetailPassportClaimSchema = z.object({
    allowanceTypeCode: z.string(),
    renewDate: z.string(),
    reason: z.string(),
});
export type AllowanceDetailPassportClaim = z.infer<
    typeof AllowanceDetailPassportClaimSchema
>;

// 8. Health Insurance
export const AllowanceDetailHealthInsuranceSchema = z.object({
    allowanceTypeCode: z.string(),
    regionCode: z.string(),
    insuranceType: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    reason: z.string(),
});
export type AllowanceDetailHealthInsurance = z.infer<
    typeof AllowanceDetailHealthInsuranceSchema
>;

// 9. Shipping Claim

// ============================================================
// Allowance Shared Schema
// ============================================================

// allowance endorsement schema
export const AllowanceEndorsementSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    remark: z.string(),
    status: z.boolean(),
});
export type AllowanceEndorsement = z.infer<typeof AllowanceEndorsementSchema>;

// allowance endorser detail
export const AllowanceEndorserDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    supporter: z.string(),
    approver: z.string(),
});
export type AllowanceEndorserDetail = z.infer<
    typeof AllowanceEndorserDetailSchema
>;
