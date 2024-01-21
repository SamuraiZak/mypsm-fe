import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// RetirementVerification
const longTextFieldRV = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const resultOptionRV = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperRetirementVerification = z.object({
    actionRemark: longTextFieldRV,
    resultOption: resultOptionRV,
});

export const _submitFormStepperRetirementVerification = async (
    formData: object,
) => {
    const stepperRetirementVerification = await superValidate(
        formData,
        _stepperRetirementVerification,
    );

    if (!stepperRetirementVerification.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperRetirementVerification);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperRetirementVerification),
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
                    'Response Returned: RetirementVerification-54',
                    json,
                );
            });
    }
    return { stepperRetirementVerification };
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
    const stepperRetirementVerification = await superValidate(
        _stepperRetirementVerification,
    );
    const stepperUpdateApplicationDeliveryInformation = await superValidate(
        _stepperUpdateApplicationDeliveryInformation,
    );

    return {
        stepperRetirementVerification,
        stepperUpdateApplicationDeliveryInformation,
    };
};