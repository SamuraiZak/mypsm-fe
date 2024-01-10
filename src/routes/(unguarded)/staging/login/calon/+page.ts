import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// creating schema
export const _calonLoginSchema = z
    .object({
        idType: z.string(),
        userGroup: z.string(),
        username: z.string().min(5),
        password: z.string().min(5),
        currentRole: z.string(),
    });

export const load = async () => {
    const form = await superValidate(_calonLoginSchema);

    return { form };
};
