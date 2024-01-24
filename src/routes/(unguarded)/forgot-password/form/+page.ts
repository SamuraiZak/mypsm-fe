import { goto } from '$app/navigation';
import http from '$lib/services/provider/service-provider.service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// creating schema
export const _resetPasswordSchema = z.object({
    idType: z.string(),
    idValue: z.string().min(5),
});

export const load = async () => {
    const form = await superValidate(_resetPasswordSchema);
    return { form };
};

export const _submit = async (formData: object) => {
    const response: Response = await http
        .post('authentication/candidate-login', {
            body: JSON.stringify(formData),
        })
        .json();

    if (response.status == 200) {
        goto('/calon/halaman-utama');
    }
};
