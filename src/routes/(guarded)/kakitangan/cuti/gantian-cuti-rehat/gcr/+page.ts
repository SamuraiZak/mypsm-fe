import { getPromiseToast,getErrorToast } from '$lib/services/core/toast/toast-service.js';
import { error, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';


const generalSelectSchema = z.string().min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _staffDetailSchema = z.object({
    gred: generalSelectSchema,
    placement: generalSelectSchema,
    group: generalSelectSchema,
    totalLeaveCollection: generalSelectSchema,
});

export const load = async ({ fetch }) => {
    const request = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    if (request.status >= 400) error;

    const userData = await request.json();
    const form = await superValidate(
        userData,
        _staffDetailSchema,
    );

    return { form };
};

export const _submitLeaveReplacementForm = async (formData: Object) => {

    const form = await superValidate(formData, _staffDetailSchema);

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