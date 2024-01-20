import http from '$lib/services/provider/service-provider.service';
import { getErrorToast, getPromiseToast } from '$lib/toast/toast-service';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// =========================================================================
// z validation schema and submit function for the ptb form fields
// =========================================================================

const textSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const dateSchema = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })
    .optional();

// PTB info update section
export const _ptbInfoSchema = z.object({
    applicantsName: textSchema.readonly(),
    applicantsId: textSchema.readonly(),
    applicationDate: dateSchema.nullish(),
    PTBDate: dateSchema,
    referenceNumber: textSchema,
    referenceDate: dateSchema,
    status: textSchema.readonly(),
    remark: textSchema.nullish(),
    pensionNumber: dateSchema,
    KWAPEmailDate: dateSchema,
});

export const load = async ({ params }) => {
    const record = await http
        .get(`api/v1/employments/pension-detail/${params.id}`, {
            prefixUrl: '',
        })
        .json();

    const PTBKWAPInfoForm = await superValidate(record.data, _ptbInfoSchema);

    return {
        PTBKWAPInfoForm,
    };
};

export const _submitPTBResult = async (formData: object) => {
    const form = await superValidate(formData, _ptbInfoSchema);

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
