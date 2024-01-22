import { fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/toast/toast-service';
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
    supporterResult: z.enum(['true', 'false'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Sila tetapkan pilihan anda.'
                    : defaultError,
        }),
    }),
});

export const load = async () => {
    const form = await superValidate( _actingSupporterResultSchema);

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
