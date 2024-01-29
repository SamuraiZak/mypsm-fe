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
}).default(0))

const generalSelectSchema = z.string().min(1, { message: "Sila tetapkan pilihan anda. " });
const generalTextSchema = z.string({
    invalid_type_error: "Medan ini tidak boleh dibiar kosong."
}).min(1, { message: "Medan ini perlu diisi dengan lengkap. " });

export const _supporterAndApproverSchema = z.object({
    supporterName: generalSelectSchema,
    approverName: generalSelectSchema,
})

export const _approvalAndOfferDetailSchema = z.object({
    typeOfPurchase: generalSelectSchema,
})

export const _secondScheduleSchema = z.object({
    purchasePrice: numberScheme,
    balancePayment: numberScheme,
    govermentFundingAndProfitAmount: numberScheme,
})

export const _sectionLeaderSchema = z.object({
    sectionLeaderRemark: generalTextSchema,
    sectionLeaderResult: z.boolean().default(true),
})


// =============================================
// load function
// =============================================
export const load = async () => {

    const supporterAndApproverForm = await superValidate(
        _supporterAndApproverSchema
    );

    const sectionLeaderForm = await superValidate(
        _sectionLeaderSchema
    );


    const approvalAndOfferForm = await superValidate(
        _approvalAndOfferDetailSchema
    )

    const secondScheduleForm = await superValidate(
        _secondScheduleSchema
    )

    
    return {
        supporterAndApproverForm,
        approvalAndOfferForm,
        sectionLeaderForm,
        secondScheduleForm,
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

export const _submitApprovalAndOfferForm = async (formData: Object) => {
    const approvalAndOfferForm = await superValidate(formData, _approvalAndOfferDetailSchema);
    if (!approvalAndOfferForm.valid) {
        getErrorToast();
        console.log(approvalAndOfferForm)
        return fail(400, approvalAndOfferForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(approvalAndOfferForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { approvalAndOfferForm }
}

export const _submitSecondScheduleForm = async (formData: Object) => {
    const secondScheduleForm = await superValidate(formData, _secondScheduleSchema);
    if (!secondScheduleForm.valid) {
        getErrorToast();
        console.log(secondScheduleForm)
        return fail(400, secondScheduleForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(secondScheduleForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { secondScheduleForm }
}

export const _submitSectionLeaderForm = async (formData: Object) => {
    const sectionLeaderForm = await superValidate(formData, _sectionLeaderSchema);
    if (!sectionLeaderForm.valid) {
        getErrorToast();
        console.log(sectionLeaderForm)
        return fail(400, sectionLeaderForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(sectionLeaderForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { sectionLeaderForm }
}
