import { fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from "zod";

// ===================================================
// Form Schema
// ===================================================
const optionalScheme = z.enum(['1', '2'], {
    errorMap: (issue) => ({
        message:
            issue.code === 'invalid_enum_value'
                ? 'Pilihan perlu dipilih.'
                : 'Pilihan perlu dipilih.',
    }),
})
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

const numberScheme = z.coerce.number({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Medan ini tidak boleh dibiarkan kosong.'
                : defaultError,
    }),
})

const generalSelectSchema = z.string().min(1, { message: "Sila tetapkan pilihan anda. " });
const generalTextSchema = z.string().min(1, { message: "Medan ini perlu diisi. " });

export const _supporterAndApproverSchema = z.object({
    supporterName: generalSelectSchema,
    approverName: generalSelectSchema,
})

export const _qualificationDetailSchema = z.object({
    baseSalaryOnlyDeduction: numberScheme,
    baseSalaryAndAllowanceDeduction: numberScheme,
    baseSalaryAndAllowanceNewDeduction: numberScheme,
})

// =============================================
// load function
// =============================================
export const load = async () => {

    const supporterAndApproverForm = await superValidate(
        _supporterAndApproverSchema
    );

    const updateLoanDetailQualificationForm = await superValidate(
        _qualificationDetailSchema
    );

    return {
        supporterAndApproverForm,
        updateLoanDetailQualificationForm,
    };
}


// =============================================
// Submit Form Function
// =============================================
export const _submitSupporterAndApproverForm = async (formData: Object) => {
    const submitSupporterAndApproverForm = await superValidate(formData, _supporterAndApproverSchema);
    if (!submitSupporterAndApproverForm.valid) {
        getErrorToast();
        console.log(submitSupporterAndApproverForm)
        return fail(400, submitSupporterAndApproverForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(submitSupporterAndApproverForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { submitSupporterAndApproverForm }
}

export const _submitUpdateLoanDetailQualificationForm = async (formData: Object) => {
    const updateLoanDetailQualificationForm = await superValidate(formData, _qualificationDetailSchema);
    if (!updateLoanDetailQualificationForm.valid) {
        getErrorToast();
        console.log(updateLoanDetailQualificationForm)
        return fail(400, updateLoanDetailQualificationForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(updateLoanDetailQualificationForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { updateLoanDetailQualificationForm }
}
