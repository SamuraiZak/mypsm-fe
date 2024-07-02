import {
    NewLoginSchema,
    type NewLoginReqeustDTO,
} from '$lib/schemas/core/login.schema';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load() {
    const loginForm = await superValidate(zod(NewLoginSchema));

    return {
        forms: {
            loginForm,
        },
    };
}

export const _submitLoginForm = async (formData: NewLoginReqeustDTO) => {
    const form = await superValidate(formData, zod(NewLoginSchema));

    if (form.valid) {
        alert('valid');
    } else {
        console.log(fail);
        return fail(400, form);
    }
};
