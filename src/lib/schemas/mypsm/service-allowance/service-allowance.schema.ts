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
    employeeId: z.number().nullish(),
    identityDocumentNumber: z.string(),
    employeeName: z.string().nullish(),
    type: z.string(),
    isDraft: z.boolean(),
});
export type ServiceAllowanceAssignDirectorType = z.infer<
    typeof ServiceAllowanceAssignDirectorSchema
>;

// Endorser Detail
export const ServiceAllowanceEndorserDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    supporterId: z.number().nullish(),
    supporterIdentityDocumentNumber: z.string(),
    supporterName: z.string().nullish(),
    approverId: z.number().nullish(),
    approverIdentityDocumentNumber: z.string(),
    approverName: z.string().nullish(),
    isDraft: z.boolean(),
});
export type ServiceAllowanceEndorserDetailType = z.infer<
    typeof ServiceAllowanceEndorserDetailSchema
>;

// Endorsement
export const ServiceAllowanceEndorsementSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    employeeId: z.number().nullish(),
    identityDocumentNumber: z.string().nullish(),
    name: z.string().nullish(),
    status: z.boolean().nullish(),
    remark: z.string().nullish(),
    date: z.string(),
    isDraft: z.boolean(),
});
export type ServiceAllowanceEndorsementType = z.infer<
    typeof ServiceAllowanceEndorsementSchema
>;

export const ServiceAllowanceSecretaryConfirmationSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    total: z.number().nullish(),
    referenceNumber: z.string().nullish(),
    date: z.string().nullish(),
    isDraft: z.boolean(),
});
export type ServiceAllowanceSecretaryConfirmationType = z.infer<
    typeof ServiceAllowanceSecretaryConfirmationSchema
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

// 6. funeral
export const ServiceAllowanceFuneralDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    employeeNumber: z.string(),
    name: z.string(),
    identityDocumentNumber: z.string(),
    deathDate: z.string(),
    deathTime: z.string(),
    nextOfKinName: z.string(),
    nextOfKinAddress: z.string(),
    relationshipId: z.number(),
    isDraft: z.boolean(),
    documents: z.array(DocumentSchema),
});

export type ServiceAllowanceFuneralDetailType = z.infer<
    typeof ServiceAllowanceFuneralDetailSchema
>;

// 7. Insurance
export const ServiceAllowanceInsuranceDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    regionCode: z.string(),
    insuranceType: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    reason: z.string(),
    isDraft: z.boolean(),
    documents: z.array(DocumentSchema),
});
export type ServiceAllowanceInsuranceDetailType = z.infer<
    typeof ServiceAllowanceInsuranceDetailSchema
>;

// 8. welfare fund
export const ServiceAllowanceWelfareFundDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    welfareTypeCode: z.string(),
    isDraft: z.boolean(),
    documents: z.array(DocumentSchema),
});
export type ServiceAllowanceWelfareFundDetailType = z.infer<
    typeof ServiceAllowanceWelfareFundDetailSchema
>;

// 9. state visit
export const FamilyDetailSchema = z.object({
    name: z.string(),
    age: z.number(),
    relationshipCode: z.string(),
});
export type FamilyDetailType = z.infer<typeof FamilyDetailSchema>;

export const ServiceAllowanceStateVisitDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    applyCode: z.string(),
    stateCode: z.string(),
    isDraft: z.boolean(),
    familyDetail: z.array(FamilyDetailSchema),
    documents: z.array(DocumentSchema),
});
export type ServiceAllowanceStateVisitDetailType = z.infer<
    typeof ServiceAllowanceStateVisitDetailSchema
>;

// 10. cargo shipping
export const ServiceAllowanceCargoShippingDetailSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    startPoint: z.string(),
    endPoint: z.string(),
    distance: z.number(),
    reason: z.string(),
    isDraft: z.boolean(),
    documents: z.array(DocumentSchema),
});
export type ServiceAllowanceCargoShippingDetailType = z.infer<
    typeof ServiceAllowanceCargoShippingDetailSchema
>;

export const ServiceAllowanceCargoShippingInvoiceSchema = z.object({
    allowanceId: z.number(),
    allowanceTypeCode: z.string(),
    isDraft: z.boolean(),
    documents: z.array(DocumentSchema),
});
export type ServiceAllowanceCargoShippingInvoiceType = z.infer<
    typeof ServiceAllowanceCargoShippingInvoiceSchema
>;
