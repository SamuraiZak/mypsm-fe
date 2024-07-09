import * as z from 'zod';

export const AuthenticationRequestSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export type AuthenticationRequestDTO = z.infer<
    typeof AuthenticationRequestSchema
>;
