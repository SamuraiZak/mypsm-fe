import { error, fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

export const _actingSupporterResultSchema = z.object({
    //TextField
    supporterRemark: z
        .string({ required_error: 'Tindakan/Ulasan tidak boleh kosong.' })
        .min(4, {
            message: 'Tindakan/Ulasan hendaklah melebihi 4 karakter.',
        })
        .max(124, {
            message: 'Tindakan/Ulasan tidak boleh melebihi 124 karakter.',
        })
        .trim(),

    //Radio Button
    supporterResult: z.boolean()
});

export const load = async ({ fetch }) => {
    const request = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    if (request.status >= 400) error;

    const userData = await request.json();
    const form = await superValidate(userData, _actingSupporterResultSchema);

    return { form };
};

export const _submitActingSupporterResultForm = async (formData: object) => {
    const form = await superValidate(formData, _actingSupporterResultSchema);
        if (!form.valid) {
            getErrorToast();
            console.log(form)
            return fail(400, form);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { form }
};
