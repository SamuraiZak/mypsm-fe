import { fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from "zod";

// ===================================================
// Form Schema
// ===================================================
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

export const _exitQuartersDetailSchema = z.object({
    exitQuarterDate: dateScheme,
})

export const _validationSchema = z.object({
    staffValidation: z.literal(true, {errorMap: ({ }) => ({
        message: "Pengesahan permohonan keluar kuarters perlu disemak."
    })})
})

// =============================================
// load function
// =============================================
export const load = async () => {

    const exitQuarterForm = await superValidate(_exitQuartersDetailSchema)
    const validationForm = await superValidate(_validationSchema)
    return {
        exitQuarterForm,
        validationForm,
    };
}

// =============================================
// Submit Form Function
// =============================================
export const _submitexitQuarterForm= async (formData: Object) => {
    const exitQuarterForm = await superValidate(formData, _exitQuartersDetailSchema);
    if (!exitQuarterForm.valid) {
        getErrorToast();
        console.log(exitQuarterForm)
        return fail(400, exitQuarterForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(exitQuarterForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { exitQuarterForm }
}

export const _submitValidationForm = async (formData: Object) => {
    const validationForm = await superValidate(formData, _validationSchema);
    if (!validationForm.valid) {
        getErrorToast();
        console.log(validationForm)
        return fail(400, validationForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(validationForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { validationForm }
}
