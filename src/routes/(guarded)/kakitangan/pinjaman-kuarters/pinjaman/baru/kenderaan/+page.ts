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

const pastDateScheme = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })

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
}).min(1, { message: "Medan ini tidak boleh dibiar kosong." });

export const _validationSchema = z.object({
    staffValidation: z.literal(true, {
        errorMap: ({ }) => ({
            message: "Pengesahan perlu disemak untuk menghantar maklumat ke pangkalan data."
        })
    })
})

export const _loanDetailSchema = z.object({
    requestedAmount: numberScheme,
    paymentPeriod: generalSelectSchema,
    reasonToLoan: generalTextSchema,
})

export const _vehicleDetailSchema = z.object({
    vehicleCondition: generalSelectSchema,
    vehicleType: generalSelectSchema,
    vehicleBrand: generalTextSchema,
    engineNo: generalTextSchema,
    registrationNo: generalTextSchema,
    registratioNDate: dateScheme,
    netPrice: numberScheme,
})

export const _loanFinancingSchema = z.object({
    hasPreviousLoan: z.boolean().default(false),
    recentLoanDate: pastDateScheme,
    totalLoan: numberScheme,
    latestPaidInstallmentDate: pastDateScheme,
    latestPaidInstallment: numberScheme,
    currentVehicle: generalTextSchema,
    currentLoanFromGoverment: z.string({
        invalid_type_error: "Medan ini tidak boleh dibiar kosong."
    }).min(1, { message: "' - ' jika tidak berkenaan." }),
}).partial()

// =============================================
// load function
// =============================================
export const load = async () => {

    const validationForm = await superValidate(_validationSchema)

    const loanDetailForm = await superValidate(_loanDetailSchema)

    const vehicleDetailForm = await superValidate(_vehicleDetailSchema)

    const loanFinancingForm = await superValidate(_loanFinancingSchema)

    return {
        validationForm,
        loanDetailForm,
        vehicleDetailForm,
        loanFinancingForm,
    };
}

// =============================================
// Submit Form Function
// =============================================
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

export const _submitLoanDetailForm = async (formData: Object) => {
    const loanDetailForm = await superValidate(formData, _loanDetailSchema);
    if (!loanDetailForm.valid) {
        getErrorToast();
        console.log(loanDetailForm)
        return fail(400, loanDetailForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(loanDetailForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { loanDetailForm }
}

export const _submitVehicleDetailForm = async (formData: Object) => {
    const vehicleDetailForm = await superValidate(formData, _vehicleDetailSchema);
    if (!vehicleDetailForm.valid) {
        getErrorToast();
        console.log(vehicleDetailForm)
        return fail(400, vehicleDetailForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(vehicleDetailForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { vehicleDetailForm }
}

export const _submitLoanFinancingForm = async (formData: Object) => {
    const loanFinancingForm = await superValidate(formData, _loanFinancingSchema);
    if (!loanFinancingForm.valid) {
        getErrorToast();
        console.log(loanFinancingForm)
        return fail(400, loanFinancingForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(loanFinancingForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { loanFinancingForm }
}