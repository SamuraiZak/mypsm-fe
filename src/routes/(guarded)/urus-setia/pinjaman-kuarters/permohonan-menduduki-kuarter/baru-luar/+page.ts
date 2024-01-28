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
}).min(1, { message: "Medan ini tidak boleh dibiar kosong." });

export const _personalDetailSchema = z.object({
    employeeNo: generalTextSchema,
    employeeName: generalTextSchema,
    identificationNo: generalTextSchema,
    grade: generalTextSchema,
    currentPlacement: generalTextSchema,
    telephoneNo: generalTextSchema,
    mailingAddress: generalTextSchema,
    status: generalTextSchema,
})

export const _partnerDetailSchema = z.object({
    partnerName: generalTextSchema,
    partnerTelephoneNo: generalTextSchema,
    partnerPosition: generalTextSchema,
    partnerSalary: numberScheme,
    noOfChildren: generalTextSchema,
})

export const _serviceDetailSchema = z.object({
    positionName: generalTextSchema,
    grade: generalTextSchema,
    services: generalSelectSchema,
    agencyAddress: generalTextSchema,
    agencyPayerAddress: generalTextSchema,
    payrollBank: generalTextSchema,
    currentSalary: numberScheme,
    itp: numberScheme,
    cola: numberScheme,
})

export const _validationSchema = z.object({
    secretaryValidation: z.literal(true, {errorMap: ({ }) => ({
        message: "Pengesahan perlu disemak sebelum ke langkah seterusnya."
    })})
})

export const _approvalRemarkFormSchema = z.object({
    secretaryRemark: generalTextSchema,
    approvalResult: z.boolean().default(true),
})

export const _quartersDetailSchema = z.object({
    approverName: generalSelectSchema,
    applicantEmail: generalEmailSchema,
    quartersEntryDate: dateScheme,
    unitAndQuarter: generalTextSchema,
    monthRentalValue: numberScheme,
    rentalDeposit: numberScheme,
    utilityDeposit: numberScheme,
})

// =============================================
// load function
// =============================================
export const load = async () => {

    const personalDetailForm = await superValidate(_personalDetailSchema);

    const partnerDetailForm = await superValidate(_partnerDetailSchema);

    const serviceDetailForm = await superValidate(_serviceDetailSchema)

    const validationForm = await superValidate(_validationSchema)

    const approvalRemarkForm = await superValidate(_approvalRemarkFormSchema);

    const quartersDetailForm = await superValidate(_quartersDetailSchema)

    return {
        personalDetailForm,
        partnerDetailForm,
        serviceDetailForm,
        validationForm,
        approvalRemarkForm,
        quartersDetailForm,
    };
}

// =============================================
// Submit Form Function
// =============================================
export const _submitPersonalDetailForm = async (formData: Object) => {
    const personalDetailForm = await superValidate(formData, _personalDetailSchema);
    if (!personalDetailForm.valid) {
        getErrorToast();
        console.log(personalDetailForm)
        return fail(400, personalDetailForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(personalDetailForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { personalDetailForm }
}

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

export const _submitQuartersDetailForm = async (formData: Object) => {
    const quartersDetailForm = await superValidate(formData, _quartersDetailSchema);
    if (!quartersDetailForm.valid) {
        getErrorToast();
        console.log(quartersDetailForm)
        return fail(400, quartersDetailForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(quartersDetailForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { quartersDetailForm }
}