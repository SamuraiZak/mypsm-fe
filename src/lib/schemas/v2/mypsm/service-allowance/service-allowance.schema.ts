import * as z from 'zod';

export const AllowanceCeremonyClothingRequestSchema = z.object({
    allowanceId: z.number().optional(),
    allowanceTypeCode: z.string(),
    reason: z.string(),
    personal: z.number(),
    partner: z.number(),
    ceremonyClothingPrevious: z.boolean(),
    ceremonyClothingPreviousDate: z.string().nullable(),
    blackTiePrevious: z.boolean(),
    blackTiePreviousDate: z.string().nullable(),
    officialClothingPrevious: z.boolean(),
    officialClothingPreviousDate: z.string().nullable(),
    isDraft: z.boolean(),
});
