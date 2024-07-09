import * as z from 'zod';

export const AccountPasswordResetSchema = z.object({
    email: z.string(),
});
export type AccountPasswordResetDTO = z.infer<typeof AccountPasswordResetSchema>;
