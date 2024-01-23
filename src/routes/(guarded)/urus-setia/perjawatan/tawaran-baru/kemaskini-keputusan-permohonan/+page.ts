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

const dateSchema = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

// New Employment - Secretary Result section
export const _meetingResultSchema = z.object({
    meetingType: z.string().min(1, { message: 'Sila pilih pilihan anda.' }),
    meetingDate: dateSchema,
    meetingRemark: longTextSchema,
});

export const load = async () => {
    const meetingResultForm = await superValidate(_meetingResultSchema);

    return {
        meetingResultForm,
    };
};

export const _submitMeetingResultResult = async (formData: object) => {
    const form = await superValidate(formData, _meetingResultSchema);

    console.log(form.data);

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
