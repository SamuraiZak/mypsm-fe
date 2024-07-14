import * as z from 'zod';

export const AllowanceEndorsementSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    isDraft: z.boolean(),
    remark: z.string(),
    status: z.boolean(),
    approvalDate: z.string(),
});

export const AllowanceEndorserDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    supporter: z.string(),
    approver: z.string(),
    isDraft: z.boolean(),
});

export const AllowanceDirectorAssignSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    isDraft: z.boolean(),
    director: z.string(),
    type: z.string(),
});

// family detail schema
export const AllowanceFamilyDetailSchema = z.object({
    name: z.string(),
    age: z.number(),
    relationshipCode: z.string(),
});

export const DocumentSchema = z.object({
    base64: z.string(),
    name: z.string(),
});

export type DocumentType = z.infer<typeof DocumentSchema>;

// Schema by type
//  1. ceremony clothing
export const AllowanceCeremonyClothingSchema = z.object({
    allowanceId: z.number().optional(),
    allowanceTypeCode: z.string(),
    reason: z.string(),
    personal: z.number().step(0.01),
    partner: z.number().step(0.01),
    ceremonyClothingPrevious: z.boolean(),
    ceremonyClothingPreviousDate: z.string().nullish(),
    blackTiePrevious: z.boolean(),
    blackTiePreviousDate: z.null().nullish(),
    officialClothingPrevious: z.boolean(),
    officialClothingPreviousDate: z.string().nullish(),
    isDraft: z.boolean(),
    documents: z.array(DocumentSchema),
});

export type AllowanceCeremonyClothingDetailType = z.infer<
    typeof AllowanceCeremonyClothingSchema
>;

//  2. winter clothing
export const AllowanceWinterClothingSchema = z.object({
    allowanceTypeCode: z.string(),
    reason: z.string(),
    personal: z.number().multipleOf(0.01),
    partner: z.number().multipleOf(0.01),
});

//  3. state visit
export const AllowanceStateVisitSchema = z.object({
    allowanceTypeCode: z.string(),
    applyCode: z.string(),
    stateCode: z.string(),
    familyDetail: z.array(AllowanceFamilyDetailSchema),
});

//  4. funeral arrangement
export const AllowanceFuneralArrangementSchema = z.object({
    allowanceTypeCode: z.string(),
    deathDate: z.string(),
    deathTime: z.string(),
});

//  5. welfare fund
export const AllowanceWelfareFundSchema = z.object({
    allowanceTypeCode: z.string(),
    welfareTypeCode: z.string(),
});

//  6. house moving
export const AllowanceHouseMovingSchema = z.object({
    allowanceTypeCode: z.string(),
    movingDate: z.string(),
    oldAddress: z.string(),
    newAddress: z.string(),
});

//  7. passport payment details
export const AllowancePassportPaymentSchema = z.object({
    allowanceTypeCode: z.string(),
    renewDate: z.string(),
    reason: z.string(),
});

//  8. insurance payment
export const AllowanceInsurancePaymentSchema = z.object({
    allowanceTypeCode: z.string(),
    regionCode: z.string(),
    insuranceType: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    reason: z.string(),
});

//  9. cargo shipping
