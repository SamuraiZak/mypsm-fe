import * as z from 'zod';

export const LoginCommonSchema = z.object({
    userGroupCode: z.string(),
    username: z
        .string()
        .min(12, { message: 'No. Kad Pengenalan tidak sah' })
        .refine(
            (value) => /^[0-9]*$/.test(value ?? ''),
            'No. Kad Pengenalan tidak sah',
        ),
    password: z
        .string()
        .min(5, { message: 'Kata laluan hendaklah melebihi 5 aksara' }),
    currentRoleCode: z.string(),
});

export const LoginClinicSchema = z.object({
    userGroupCode: z.string(),
    username: z
        .string()
        .min(5, { message: 'ID Pengguna hendaklah melebihi 5 aksara' }),
    password: z
        .string()
        .min(5, { message: 'Kata laluan hendaklah melebihi 5 aksara' }),
    currentRoleCode: z.string(),
});

export const ForgotPasswordSchema = z.object({
    email: z.string().email(),
});
