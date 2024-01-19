import http from '$lib/services/provider/service-provider.service';
import { getErrorToast, getPromiseToast } from '$lib/toast/toast-service';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// =====================================================================================
// z validation schema for the advancement form fields
// =====================================================================================

const shortTextSchema = z
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
    .max(new Date(), {
        message: 'Tarikh lepas tidak boleh lebih dari tarikh semasa.',
    });

// =========================================================================
// applicants schema
// =========================================================================
export const _applicantsSchema = z.object({
    selectedStaffs: z.any().array().nonempty({
        message: 'Sila pilih sekurang - kurangnya satu pekerja',
    }),
});

// =========================================================================
// advancement schema
// =========================================================================
export const _advancementSchema = z.object({
    meetingGroupName: shortTextSchema,
    meetingDate: dateSchema,
    employees: z.any().array(),
});

export const load = async () => {
    const applicantsForm = await superValidate(_applicantsSchema);
    const advancementForm = await superValidate(_advancementSchema);

    return {
        applicantsForm,
        advancementForm,
    };
};

// =========================================================================
// advancement form fields submit function
// =========================================================================
export const _submitAdvancementApplicantsForm = async (formData: object) => {
    const form = await superValidate(formData, _advancementSchema);

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
