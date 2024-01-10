import { z } from "zod";

export const _loginSchema = z.object({
    username: z.string().min(2),
    password: z.string().min(6)
});

export type LoginSchema = typeof _loginSchema;