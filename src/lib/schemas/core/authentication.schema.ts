import * as z from 'zod';

export const AuthenticationRequestSchema = z.object({
    username: z.string().min(5, {
        message:
            'No. Kad Pengenalan / ID pengguna hendaklah diisi dengan sekurang-kurangnya 5 aksara',
    }),
    password: z.string().min(5, {
        message:
            'Kata laluan hendaklah diisi dengan sekurang-kurangnya 5 aksara',
    }),
});

export type AuthenticationRequestDTO = z.infer<
    typeof AuthenticationRequestSchema
>;
