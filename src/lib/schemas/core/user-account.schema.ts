import * as z from 'zod';

export const AccountPasswordResetSchema = z.object({
    email: z.string().email(),
});
export type AccountPasswordResetDTO = z.infer<
    typeof AccountPasswordResetSchema
>;
