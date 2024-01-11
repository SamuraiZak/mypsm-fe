import api from "$lib/services/core/ky.service";
import { error, fail } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms/client";
import { z } from 'zod';
import toast from "svelte-french-toast";

const dateScheme = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiarkan kosong.'
                    : defaultError,
        }),
    })
    .min(new Date(), {
        message:
            'Tarikh lapor diri yang dipohon hendaklah tidak kurang dari tarikh semasa.',
    }) 

export const _amendmentOfPlacementApplicationSchema = z.object({
    amendmentDropdown: z.enum(['true', 'false'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }),
    requestedPlacementAmendment: z.enum(['true', 'false'], {
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_enum_value'
                    ? 'Pilihan perlu dipilih.'
                    : defaultError,
        }),
    }),
    requestedReportingDate: dateScheme,
});

export const load = async ({ fetch }) => {
    const request = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    if (request.status >= 400) error;

    const userData = await request.json();
    const form = await superValidate(userData, _amendmentOfPlacementApplicationSchema);

    return { form };
}

export const _submitActingDirectorResultForm = async (event: Event) => {
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const dropdownSelection = document.getElementById('amendmentDropdown');
    const requestedPlacementSelection = document.getElementById('requestedPlacementAmendment');

    const form = await superValidate(formData, _amendmentOfPlacementApplicationSchema);

    if (!form.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        console.log(400, form)
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
                console.log('Response Returned: ', json)
            });
    }
    return { form };
}