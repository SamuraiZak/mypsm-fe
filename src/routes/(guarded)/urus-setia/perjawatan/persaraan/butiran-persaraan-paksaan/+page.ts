import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Verification Retirement Application
const longTextFieldVRA = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const resultOptionVRA = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperVerificationRetirementApplication = z.object({
    actionRemark: longTextFieldVRA,
    resultOption: resultOptionVRA,
});

export const _submitFormStepperVerificationRetirementApplication = async (
    formData: object,
) => {
    const stepperVerificationRetirementApplication = await superValidate(
        formData,
        _stepperVerificationRetirementApplication,
    );

    if (!stepperVerificationRetirementApplication.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperVerificationRetirementApplication);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperVerificationRetirementApplication),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });
    getPromiseToast(responsePromise);
    return { stepperVerificationRetirementApplication };
};

// Verification Retirement Documents
const longTextFieldVRD = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const resultOptionVRD = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperVerificationRetirementDocuments = z.object({
    actionRemarkVRD: longTextFieldVRD,
    resultOptionVRD: resultOptionVRD,
});

export const _submitFormStepperVerificationRetirementDocuments = async (
    formData: object,
) => {
    const stepperVerificationRetirementDocuments = await superValidate(
        formData,
        _stepperVerificationRetirementDocuments,
    );

    if (!stepperVerificationRetirementDocuments.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperVerificationRetirementDocuments);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperVerificationRetirementDocuments),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });
    getPromiseToast(responsePromise);
    return { stepperVerificationRetirementDocuments };
};

// Update Application Delivery Information
const longTextFieldUADI = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const resultOptionUADI = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperUpdateApplicationDeliveryInformation = z.object({
    actionRemarkUADI: longTextFieldUADI,
    resultOptionUADI: resultOptionUADI,
});

export const _submitFormStepperUpdateApplicationDeliveryInformation = async (
    formData: object,
) => {
    const stepperUpdateApplicationDeliveryInformation = await superValidate(
        formData,
        _stepperUpdateApplicationDeliveryInformation,
    );

    if (!stepperUpdateApplicationDeliveryInformation.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperUpdateApplicationDeliveryInformation);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperUpdateApplicationDeliveryInformation),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => {
            console.log('Response Returned: ', json);
        });
    getPromiseToast(responsePromise);
    return { stepperUpdateApplicationDeliveryInformation };
};

//Async
export const load = async () => {
    const stepperVerificationRetirementApplication = await superValidate(
        _stepperVerificationRetirementApplication,
    );
    const stepperVerificationRetirementDocuments = await superValidate(
        _stepperVerificationRetirementDocuments,
    );
    const stepperUpdateApplicationDeliveryInformation = await superValidate(
        _stepperUpdateApplicationDeliveryInformation,
    );

    return {
        stepperVerificationRetirementApplication,
        stepperVerificationRetirementDocuments,
        stepperUpdateApplicationDeliveryInformation,
    };
};
