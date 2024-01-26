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
const generalTextSchema = z.string().min(1, { message: "Medan ini perlu diisi dengan lengkap. " });

export const _approvalRemarkFormSchema = z.object({
    secretaryRemark: generalTextSchema,
    approvalResult: generalSelectSchema,
})

export const _approvalAndOfferSchema = z.object({
    approvalName: generalTextSchema,
    applicantEmail: generalSelectSchema,
    quarterEntryDate: dateScheme,
    unitAndQuarter: generalTextSchema,
    rentalPaymentRates: generalSelectSchema,
})

// =============================================
// load function
// =============================================
export const load = async () => {

    const approvalRemarkForm = await superValidate(
        _approvalRemarkFormSchema
    );

    const approvalAndOfferForm = await superValidate(
        _approvalAndOfferSchema
    );
    return {
        approvalRemarkForm,
        approvalAndOfferForm
    };
}

// =============================================
// Submit Form Function
// =============================================
export const _submitApprovalRemarkForm = async (formData: Object) => {
    const approvalRemarkForm = await superValidate(formData, _approvalRemarkFormSchema);
    if (!approvalRemarkForm.valid) {
        getErrorToast();
        console.log(approvalRemarkForm)
        return fail(400, approvalRemarkForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(approvalRemarkForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { approvalRemarkForm }
}

export const _submitApprovalAndOfferForm= async (formData: Object) => {
    const approvalAndOfferkForm = await superValidate(formData, _approvalAndOfferSchema);
    if (!approvalAndOfferkForm.valid) {
        getErrorToast();
        console.log(approvalAndOfferkForm)
        return fail(400, approvalAndOfferkForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(approvalAndOfferkForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { approvalAndOfferkForm }
}