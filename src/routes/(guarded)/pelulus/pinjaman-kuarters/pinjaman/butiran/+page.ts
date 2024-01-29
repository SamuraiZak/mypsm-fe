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

export const _qualificationDetailSchema = z.object({
    baseSalaryOnlyDeduction: numberScheme,
    baseSalaryAndAllowanceDeduction: numberScheme,
    baseSalaryAndAllowanceNewDeduction: numberScheme,
})

export const _approvalAndOfferDetailSchema = z.object({
    typeOfPurchase: generalSelectSchema,
    purchasePrice: numberScheme,
    downpayment: numberScheme,
    governmentFinancingAmountPaymentAndProfit: numberScheme,
    amountOfGovernmentFunding: numberScheme,
    sellingPrices: numberScheme,
    monthlyInstallment: numberScheme,
    startDate: dateScheme,
    duration: generalTextSchema,
})

export const _firstScheduleSchema = z.object({
    engineNo: generalTextSchema,
    chasisNo: generalTextSchema,
    brand: generalTextSchema,
    modelName: generalTextSchema,
    enginePower: generalTextSchema,
    fuel: generalTextSchema,
    utilityClass: generalTextSchema,
    bodyType: generalTextSchema,
    yearMade: generalTextSchema,
    previousOwnerName: generalTextSchema,
    identificationNo: generalTextSchema,
    address: generalTextSchema,
    totalPurchasePrice: numberScheme,
    balancePayment: numberScheme,
    govermentFundingAmount: numberScheme,
}).partial()

export const _secondScheduleSchema = z.object({
    purchasePrice: numberScheme,
    balancePayment: numberScheme,
    govermentFundingAndProfitAmount: numberScheme,
    monthlyAmount: numberScheme,
    paymentDuration: generalSelectSchema,
    govermentFundingAndProfitAmountDetail: numberScheme,
    govermentBalancePayment: numberScheme,
}).partial()

export const _letterOfAgreementSchema = z.object({
    received: z.boolean().default(true),
    checked: z.boolean().default(true),
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

    const approvalAndOfferForm = await superValidate(
        _approvalAndOfferDetailSchema
    )

    const vehicleDetailAndDescriptionForm = await superValidate(
        _firstScheduleSchema
    )

    const secondScheduleForm = await superValidate(
        _secondScheduleSchema
    )

    const letterOfAgreementForm = await superValidate(
        _letterOfAgreementSchema
    )

    return {
        supporterAndApproverForm,
        updateLoanDetailQualificationForm,
        approvalAndOfferForm,
        vehicleDetailAndDescriptionForm,
        secondScheduleForm,
        letterOfAgreementForm,
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

export const _submitVehicleDetailAndDescriptionForm = async (formData: Object) => {
    const vehicleDetailAndDescriptionForm = await superValidate(formData, _firstScheduleSchema);
    if (!vehicleDetailAndDescriptionForm.valid) {
        getErrorToast();
        console.log(vehicleDetailAndDescriptionForm)
        return fail(400, vehicleDetailAndDescriptionForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(vehicleDetailAndDescriptionForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { vehicleDetailAndDescriptionForm }
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

export const _submitLetterOfAgreementForm = async (formData: Object) => {
    const letterOfAgreementForm = await superValidate(formData, _letterOfAgreementSchema);
    if (!letterOfAgreementForm.valid) {
        getErrorToast();
        console.log(letterOfAgreementForm)
        return fail(400, letterOfAgreementForm);
    }
    const responsePromise = fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(letterOfAgreementForm),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise)
    return { letterOfAgreementForm }
}