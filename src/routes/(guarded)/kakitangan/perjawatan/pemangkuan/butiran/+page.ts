import { error, fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const dateScheme = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })
    .min(new Date(), {
        message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
    });


const generalSelectSchema = z.string().min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _amendmentOfPlacementApplicationSchema = z.object({
    amendmentDropdown: generalSelectSchema,
    requestedPlacementAmendment: generalSelectSchema,
    requestedReportingDate: dateScheme,
});

export const load = async ({ fetch }) => {
    const request = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    if (request.status >= 400) error;

    const userData = await request.json();
    const form = await superValidate(
        userData,
        _amendmentOfPlacementApplicationSchema,
    );

    return { form };
};

export const _submitActingDirectorResultForm = async (formData: Object) => {

    const form = await superValidate(formData, _amendmentOfPlacementApplicationSchema);

    if (!form.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        console.log(400, form);
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
                console.log('Response Returned: ', json);
            });
    }
    
    return { form };
};
