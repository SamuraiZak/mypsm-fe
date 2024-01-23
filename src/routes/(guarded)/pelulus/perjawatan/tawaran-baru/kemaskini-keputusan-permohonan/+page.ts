// =========================================================================
// z validation schema and submit function for the new employment form fields
// =========================================================================

import http from '$lib/services/provider/service-provider.service';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const longTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const booleanSchema = z.boolean({
    required_error: 'Sila tetapkan pilihan anda.',
    invalid_type_error: 'Medan ini haruslah jenis boolean.',
});

// New Employment - Supporter Result section
export const _approverResultSchema = z.object({
    approverRemark: longTextSchema,
    approverResult: booleanSchema,
});

export const load = async () => {
    const supporterForm = await superValidate(_approverResultSchema);

    return {
        supporterForm,
    };
};

export const _submitApproverResultForm = async (formData: object) => {
    const form = await superValidate(formData, _approverResultSchema);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    const responsePromise = http
        .post('https://jsonplaceholder.typicode.com/posts', {
            body: JSON.stringify(form),
            prefixUrl: '',
        })
        .json()
        .then((json) => console.log('Response: ', json));

    getPromiseToast(responsePromise);
    return { form };
};
