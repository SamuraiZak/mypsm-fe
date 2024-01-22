import { fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/toast/toast-service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

export const _actingDirectorResultSchema = z.object({
    //TextField
    directorRemark: z
        .string({ required_error: 'Tindakan/Ulasan tidak boleh kosong.' })
        .min(4, {
            message: 'Tindakan/Ulasan hendaklah melebihi 4 karakter.',
        })
        .max(124, {
            message: 'Tindakan/Ulasan tidak boleh melebihi 124 karakter.',
        })
        .trim(),

    //Radio Button
    directorResult: z.enum(['true', 'false'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Sila tetapkan pilihan anda.'
                    : defaultError,
        }),
    }),
});

export const load = async () => {
    const form = await superValidate(_actingDirectorResultSchema);

    return { form };
};

export const _submitActingDirectorResultForm = async (event: Event) => {
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const form = await superValidate(formData, _actingDirectorResultSchema);

    if (!form.valid) {
        getErrorToast();
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
    return { form };
};
