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

const numberScheme = z.union([z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}), z.number()]).transform((x) => Number(x)).pipe(z.number({
    required_error: "Medan ini tidak boleh dibiar kosong.",
    invalid_type_error: "Hanya nombor sahaja dibenarkan. Contoh (500.40)",
    description: "Hanya nombor sahaja dibenarkan. Contoh (500.40)"
}))

const generalEmailSchema = z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}).email("Sila nyatakan format emel yang sah. ")

const generalSelectSchema = z.string().min(1, { message: "Sila tetapkan pilihan anda. " });

const generalTextSchema = z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}).min(1, { message: "Medan ini perlu diisi dengan lengkap. " });

export const _approvalRemarkFormSchema = z.object({
    secretaryRemark: generalTextSchema,
    approvalResult: z.boolean().default(true),
})

export const _approvalAndOfferSchema = z.object({
    approvalName: generalSelectSchema,
    applicantEmail: generalEmailSchema,
    quarterEntryDate: dateScheme,
    unitAndQuarter: generalTextSchema,
    rentalPaymentRates: generalSelectSchema,
    monthlyRentalValue: numberScheme,
    twoMonthsDeposit: numberScheme,
    utilityDeposit: numberScheme,
}).partial()

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

export const _submitApprovalAndOfferForm = async (formData: Object) => {
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