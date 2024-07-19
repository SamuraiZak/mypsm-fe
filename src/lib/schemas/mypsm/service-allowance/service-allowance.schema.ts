import * as z from 'zod';

// ================================================================
// SHARED
// ================================================================
export const DocumentSchema = z.object({
    base64: z.string(),
    name: z.string(),
});
export type DocumentType = z.infer<typeof DocumentSchema>;

// Assign Director
export const ServiceAllowanceAssignDirectorSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    isDraft: z.boolean(),
    director: z.string(),
    type: z.string(),
});
export type ServiceAllowanceAssignDirectorType = z.infer<
    typeof ServiceAllowanceAssignDirectorSchema
>;

// Endorser Detail
export const ServiceAllowanceEndorserDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    supporter: z.string(),
    approver: z.string(),
    isDraft: z.boolean(),
});
export type ServiceAllowanceEndorserDetailType = z.infer<
    typeof ServiceAllowanceEndorserDetailSchema
>;

// Endorsement
export const ServiceAllowanceEndorsementSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    isDraft: z.boolean(),
    remark: z.string(),
    status: z.boolean(),
    approvalDate: z.string().optional(),
});
export type ServiceAllowanceEndorsementType = z.infer<
    typeof ServiceAllowanceEndorsementSchema
>;

// ===============================================================
// DETAILS EACH TYPE
// ===============================================================

// 1. Ceremony Clothing
export const ServiceAllowanceCeremonyClothingDetailSchema = z
    .object({
        allowanceId: z.number(),
        allowanceTypeCode: z.string(),
        reason: z
            .string()
            .min(1, { message: 'Ruangan ini tidak boleh dibiarkan kosong' })
            .trim(),
        personal: z.number().default(0),
        partner: z.number().default(0),
        ceremonyClothingPrevious: z.boolean().nullish(),
        ceremonyClothingPreviousDate: z.string().nullable().default(null),
        blackTiePrevious: z.boolean().nullish(),
        blackTiePreviousDate: z.string().nullable().default(null),
        officialClothingPrevious: z.boolean().nullish(),
        officialClothingPreviousDate: z.string().nullable().default(null),
        isDraft: z.boolean(),
        documents: z
            .array(DocumentSchema)
            .min(1, { message: 'Dokumen sokongan adalah wajib disertakan' }),
    })
    .refine(
        (data) => {
            if (
                data.ceremonyClothingPrevious &&
                !data.ceremonyClothingPreviousDate
            ) {
                return false;
            }
            return true;
        },
        {
            message:
                'Ceremony clothing previous date is required if ceremony clothing previous is true',
            path: ['ceremonyClothingPreviousDate'],
        },
    )
    .refine(
        (data) => {
            if (data.blackTiePrevious && !data.blackTiePreviousDate) {
                return false;
            }
            return true;
        },
        {
            message:
                'Black tie previous date is required if black tie previous is true',
            path: ['blackTiePreviousDate'],
        },
    )
    .refine(
        (data) => {
            if (
                data.officialClothingPrevious &&
                !data.officialClothingPreviousDate
            ) {
                return false;
            }
            return true;
        },
        {
            message:
                'Official clothing previous date is required if official clothing previous is true',
            path: ['officialClothingPreviousDate'],
        },
    );

export type ServiceAllowanceCeremonyClothingDetailType = z.infer<
    typeof ServiceAllowanceCeremonyClothingDetailSchema
>;

// 2. passport payment
export const ServiceAllowancePassportPaymentDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    renewDate: z.string(),
    reason: z
        .string()
        .min(1, { message: 'Ruangan ini tidak boleh dibiarkan kosong' })
        .trim(),
    isDraft: z.boolean(),
    documents: z
        .array(DocumentSchema)
        .min(1, { message: 'Dokumen sokongan adalah wajib disertakan' }),
});
export type ServiceAllowancePassportPaymentDetailType = z.infer<
    typeof ServiceAllowancePassportPaymentDetailSchema
>;

// 3. other allowance
export const ServiceAllowanceOtherAllowanceDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    amount: z.number(),
    reason: z.string(),
    isDraft: z.boolean(),
    documents: z
        .array(DocumentSchema)
        .min(1, { message: 'Dokumen sokongan adalah wajib disertakan' }),
});
export type ServiceAllowanceOtherAllowanceDetailType = z.infer<
    typeof ServiceAllowanceOtherAllowanceDetailSchema
>;

// 4. house moving
export const ServiceAllowanceHouseMovingDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    movingDate: z.string(),
    oldAddress: z.string(),
    newAddress: z.string(),
    isDraft: z.boolean(),
    documents: z
        .array(DocumentSchema)
        .min(1, { message: 'Dokumen sokongan adalah wajib disertakan' }),
});
export type ServiceAllowanceHouseMovingDetailType = z.infer<
    typeof ServiceAllowanceHouseMovingDetailSchema
>;

// 5. winter clothing
export const ServiceAllowanceWinterClothingDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    reason: z.string(),
    personal: z.number(),
    isDraft: z.boolean(),
    documents: z
        .array(DocumentSchema)
        .min(1, { message: 'Dokumen sokongan adalah wajib disertakan' }),
});
export type ServiceAllowanceWinterClothingDetailType = z.infer<
    typeof ServiceAllowanceWinterClothingDetailSchema
>;
