import * as z from 'zod';

export const DocumentSchema = z.object({
    base64: z.string(),
    name: z.string(),
});
export type Document = z.infer<typeof DocumentSchema>;

export const AllowanceCeremonyClothingRequestSchema = z.object({
    allowanceId: z.number().optional(),
    allowanceTypeCode: z.string(),
    reason: z.string(),
    personal: z.number(),
    partner: z.number(),
    ceremonyClothingPrevious: z.boolean(),
    ceremonyClothingPreviousDate: z.string().nullish(),
    blackTiePrevious: z.boolean(),
    blackTiePreviousDate: z.string().nullish(),
    officialClothingPrevious: z.boolean(),
    officialClothingPreviousDate: z.string().nullish(),
    isDraft: z.boolean(),
    documents: z.array(DocumentSchema).optional(),
});
export type AllowanceCeremonyClothingRequestDTO = z.infer<
    typeof AllowanceCeremonyClothingRequestSchema
>;
