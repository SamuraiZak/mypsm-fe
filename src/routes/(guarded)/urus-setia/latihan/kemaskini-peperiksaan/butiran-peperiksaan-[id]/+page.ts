// a module to exports the load function that fetches data for the +page.svelte.

import { mockExams } from '$lib/mocks/latihan/mockExams.js';
import { fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from "zod";

export async function load({ params }) {
    const data: IntExams[] = mockExams;

    const currentExam: IntExams | undefined = data.find(
        (exam) => exam.id === params.id,
    );

    if (!currentExam) throw new Error('Record not found');

    const examiantionDetailForm = await superValidate(
        _examinationDetailSchema
    )
    return {
        record: {
            data,
            currentExam,
        },
        examiantionDetailForm
    };
}

//========================================
// New Examination Schema ================
//========================================
const generalSchema = z.string().min(1, { message: "Sila tetapkan pilihan anda." })
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

export const _examinationDetailSchema = z.object({
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
export const _submitExaminationDetailForm = async (formData: Object) => {
    const examinationDetailForm = await superValidate(formData, _examinationDetailSchema);
    if (!examinationDetailForm.valid) {
        getErrorToast();
        console.log(examinationDetailForm)
        return fail(400, examinationDetailForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(examinationDetailForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { examinationDetailForm }
}

