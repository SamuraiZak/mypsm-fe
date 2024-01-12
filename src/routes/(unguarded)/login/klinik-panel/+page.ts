import { goto } from '$app/navigation';
import http from '$lib/services/core/ky.service.js';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// creating schema
export const _calonLoginSchema = z.object({
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

export const _submit = async (formData: object) => {
    const response: Response = await http
        .post('http://127.0.0.1:3333/api/v1/authentication/login', {
            body: JSON.stringify(formData),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            prefixUrl: '',
        })
        .json();

    if (response.status == 200) {
        goto('/calon/halaman-utama');
    }
};
