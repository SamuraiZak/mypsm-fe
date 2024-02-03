import { goto } from '$app/navigation';
import http from '$lib/services/provider/service-provider.service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// creating schema
export const _updatePasswordSchema = z.object({
    username: z.string(),
    oldPassword: z.string().min(2),
    newPassword: z.string().min(2)
});

export const load = async () => {
    const form = await superValidate(_updatePasswordSchema);
    return { form };
};

export const _submit = async (formData: object) => {
    // const response: Response = await http
    //     .post('authentication/candidate-login', {
    //         body: JSON.stringify(formData),
    //     })
    //     .json();

    // if (response.status == 200) {
    //     goto('/calon/halaman-utama');
    // }
    alert("hello");
};
