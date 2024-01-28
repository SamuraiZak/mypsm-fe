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
const earlyDateScheme = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    });

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
}).default(0))

const generalEmailSchema = z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}).email("Sila nyatakan format emel yang sah. ")
const generalSelectSchema = z.string().min(1, { message: "Sila tetapkan pilihan anda. " });
const generalTextSchema = z.string({invalid_type_error: "Medan ini tidak boleh dibiar kosong."}).min(1, { message: "Medan ini perlu diisi dengan lengkap. " });

export const _approvalRemarkFormSchema = z.object({
    secretaryRemark: generalTextSchema,
    approvalResult: generalSelectSchema,
})

export const _exitQuartersSchema = z.object({
    exitQuarterDate: dateScheme,
    unitAndQuarter: generalTextSchema,
    approverName: generalSelectSchema,
    applicantEmail: generalEmailSchema,
    quarterEntryDate: earlyDateScheme,
    monthlyRentalAmount: numberScheme,
    depositAmount: numberScheme,
}).partial()

export const _nonStaffExitQuarterSchema = z.object({
    quarterExitDate: dateScheme,
    hasOutstanding: z.boolean().default(false),
    outstandingAmount: numberScheme.optional(),
}).partial()

// =============================================
// load function
// =============================================
export const load = async () => {

    const approvalRemarkForm = await superValidate(
        _approvalRemarkFormSchema
    );

    const exitQuarterForm = await superValidate(
        _exitQuartersSchema
    );

    const nonStaffExitQuarterForm = await superValidate(_nonStaffExitQuarterSchema)

    return {
        approvalRemarkForm,
        exitQuarterForm,
        nonStaffExitQuarterForm,
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

export const _submitExitQuarterForm = async (formData: Object) => {
    const exitQuarterForm = await superValidate(formData, _exitQuartersSchema);
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

export const _submitNonStaffExitQuarterForm = async (formData: Object) => {
    const nonStaffExitQuarterForm = await superValidate(formData, _nonStaffExitQuarterSchema);
    if (!nonStaffExitQuarterForm.valid) {
        getErrorToast();
        console.log(nonStaffExitQuarterForm)
        return fail(400, nonStaffExitQuarterForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(nonStaffExitQuarterForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { nonStaffExitQuarterForm }
}