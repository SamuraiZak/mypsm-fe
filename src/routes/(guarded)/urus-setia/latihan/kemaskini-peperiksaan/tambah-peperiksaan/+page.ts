import { fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from "zod";

//========================================
// Load function =========================
//========================================
export const load = async () => {
    const newExaminationForm = await superValidate(
        _newExaminationSchema
    )

    return {
        newExaminationForm
    };
}

//========================================
// New Examination Schema ================
//========================================
const generalSchema = z.string().min(1, {message: "Sila tetapkan pilihan anda."})
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

export const _newExaminationSchema = z.object({
    examType: generalSchema,
    examTitle: generalSchema,
    examApplicationOpenDate: dateScheme,
    examApplicationCloseDate: dateScheme,
    examDate: dateScheme,
    examLocation: generalSchema,
})

//========================================
// Form Validation Function ==============
//========================================
export const _submitNewExaminationForm = async (formData: Object) => {
    const newExaminationForm = await superValidate(formData, _newExaminationSchema);
        if (!newExaminationForm.valid) {
            getErrorToast();
            console.log(newExaminationForm)
            return fail(400, newExaminationForm);
        }
        const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(newExaminationForm),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response Returned: ', json);
            });

        getPromiseToast(responsePromise)
        return { newExaminationForm }
}
