import api from "$lib/services/core/ky.service";
import { error, fail } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms/client";
import { z } from 'zod';
import toast from "svelte-french-toast";

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

export const load = async ({ fetch }) => {
    const request = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    if (request.status >= 400) error;

    const userData = await request.json();
    const form = await superValidate(userData, _actingDirectorResultSchema);

    return { form };
}

export const _submitActingDirectorResultForm = async (event: Event) => {
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const form = await superValidate(formData, _actingDirectorResultSchema);

    if (!form.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, form);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },

        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log('Response Returned: 1-54', json)
            });
    }
    return { form };
}