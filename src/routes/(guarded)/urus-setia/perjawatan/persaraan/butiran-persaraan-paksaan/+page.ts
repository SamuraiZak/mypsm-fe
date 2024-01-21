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
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperVerificationRetirementApplication),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log(
                    'Response Returned: VerificationRetirementApplication-54',
                    json,
                );
            });
    }
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
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperVerificationRetirementDocuments),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log(
                    'Response Returned: VerificationRetirementDocuments-54',
                    json,
                );
            });
    }
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
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperUpdateApplicationDeliveryInformation),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log(
                    'Response Returned: UpdateApplicationDeliveryInformation-54',
                    json,
                );
            });
    }
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