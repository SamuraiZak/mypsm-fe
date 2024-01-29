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
}).min(1, { message: "Medan ini tidak boleh dibiar kosong." });

export const _partnerDetailSchema = z.object({
    partnerName: generalTextSchema,
    partnerTelephoneNo: generalTextSchema,
    partnerPosition: generalTextSchema,
    partnerSalary: numberScheme,
    noOfChildren: generalTextSchema,
})

export const _serviceDetailSchema = z.object({
    agencyAddress: generalTextSchema,
    payrollAgency: generalTextSchema,
    payrollBank: generalTextSchema,
})

export const _validationSchema = z.object({
    staffValidation: z.literal(true, {errorMap: ({ }) => ({
        message: "Pengesahan perlu disemak untuk menghantar permohonan kuarters ke pangkalan data."
    })})
})

// =============================================
// load function
// =============================================
export const load = async () => {
    const partnerDetailForm = await superValidate(_partnerDetailSchema);
    const serviceDetailForm = await superValidate(_serviceDetailSchema);
    const validationForm = await superValidate(_validationSchema)
    return {
        partnerDetailForm,
        serviceDetailForm,
        validationForm,
    };
}

// =============================================
// Submit Form Function
// =============================================
export const _submitPartnerDetailForm = async (formData: Object) => {
    const partnerDetailForm = await superValidate(formData, _partnerDetailSchema);
    if (!partnerDetailForm.valid) {
        getErrorToast();
        console.log(partnerDetailForm)
        return fail(400, partnerDetailForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(partnerDetailForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { partnerDetailForm }
}

export const _submitServiceDetailForm = async (formData: Object) => {
    const serviceDetailForm = await superValidate(formData, _serviceDetailSchema);
    if (!serviceDetailForm.valid) {
        getErrorToast();
        console.log(serviceDetailForm)
        return fail(400, serviceDetailForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(serviceDetailForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { serviceDetailForm }
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