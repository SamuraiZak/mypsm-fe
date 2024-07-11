import * as z from 'zod';

export const AccountPasswordResetSchema = z.object({
    email: z.string().email(),
});
export type AccountPasswordResetDTO = z.infer<
    typeof AccountPasswordResetSchema
>;

export const AccountUpdatePasswordSchema = z.object({
    oldPassword: z
        .string()
        .min(5, { message: 'Kataluan hendaklah melebihi 5 aksara' }),
    newPassword: z
        .string()
        .min(5, { message: 'Kataluan hendaklah melebihi 5 aksara' }),
    confirmPassword: z
        .string()
        .min(5, { message: 'Kataluan hendaklah melebihi 5 aksara' }),
})
.superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Kata laluan tidak sepadan',
            path: ['confirmPassword'],
        });
    }
});
export type AccountUpdatePasswordDTO = z.infer<typeof AccountUpdatePasswordSchema>;