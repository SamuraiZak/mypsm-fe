import { fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from "zod";

// ===================================================
// Form Schema
// ===================================================
const generalSelectSchema = z.string().min(1, { message: "Sila tetapkan pilihan anda. " });

export const _quartersRentalRate = z.object({
    rentalRateOption: generalSelectSchema,
})

// =============================================
// load function
// =============================================
export const load = async () => {
    const quarterRentalRateForm = await superValidate(
        _quartersRentalRate
    );

    return {
        quarterRentalRateForm,
    }
}

// =============================================
// Submit Form Function
// =============================================
export const _submitQuarterRentalRateForm = async (formData: Object) => {
    const quarterRentalRateForm = await superValidate(formData, _quartersRentalRate);
    if (!quarterRentalRateForm.valid) {
        getErrorToast();
        console.log(quarterRentalRateForm)
        return fail(400, quarterRentalRateForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(quarterRentalRateForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { quarterRentalRateForm }
}
