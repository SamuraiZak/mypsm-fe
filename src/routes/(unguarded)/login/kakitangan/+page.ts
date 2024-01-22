import { goto } from '$app/navigation';
import http from '$lib/services/core/ky.service.js';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// creating schema
export const _kakitanganLoginSchema = z.object({
    idType: z.string(),
    userGroup: z.string(),
    username: z.string().min(5),
    password: z.string().min(5),
    currentRole: z.string(),
});

export const load = async () => {
    const form = await superValidate(_kakitanganLoginSchema);
    return { form };
};

export const _submit = async (formData: object) => {
    const response: Response = await http
        .post('authentication/employee-login', {
            body: JSON.stringify(formData),
        })
        .json();

    if (response.status == 200) {
        goto('/kakitangan/halaman-utama');
    }
};
