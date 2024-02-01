import { fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
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
    amendmentDropdown: z.boolean(),
    requestedPlacementAmendment: generalSelectSchema,
    requestedReportingDate: dateScheme,
});

export const load = async () => {
    const form = await superValidate(
        _amendmentOfPlacementApplicationSchema,
    );

    return { form };
};

export const _submitActingDirectorResultForm = async (formData: Object) => {

    const form = await superValidate(formData, _amendmentOfPlacementApplicationSchema);
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
