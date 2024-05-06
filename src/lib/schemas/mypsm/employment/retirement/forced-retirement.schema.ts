import * as z from 'zod';

// forced retirement endorsement schema
export const ForcedRetirementEndorsementSchema = z.object({
    retirementId: z.number(),
    status: z.boolean(),
    remark: z.string(),
});
export type ForcedRetirementEndorsement = z.infer<
    typeof ForcedRetirementEndorsementSchema
>;

export const DocumentSchema = z.object({
    name: z.string(),
    base64: z.string(),
});
export type DocumentObject = z.infer<typeof DocumentSchema>;

export const ForcedRetirementDocumentUploadSchema = z.object({
    retirementId: z.number(),
    forms: z.array(DocumentSchema),
});
export type ForcedRetirementDocumentUpload = z.infer<
    typeof ForcedRetirementDocumentUploadSchema
>;
