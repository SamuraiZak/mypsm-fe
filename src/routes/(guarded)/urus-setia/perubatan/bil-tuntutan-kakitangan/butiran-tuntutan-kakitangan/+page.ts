import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Application Validation
const longTextField = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const option = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperApplicationValidation = z.object({
    remark: longTextField,
    resultOption: option,
});

export const _submitFormStepperApplicationValidation = async (
    formData: object,
) => {
    const stepperApplicationValidation = await superValidate(
        formData,
        _stepperApplicationValidation,
    );

    if (!stepperApplicationValidation.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperApplicationValidation);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperApplicationValidation),
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
    return { stepperApplicationValidation };
};

// Supporter Approver
const textField = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperSupporterApprover = z.object({
    supporterName: textField,
    approverName: textField,
});

export const _submitFormStepperSupporterApprover = async (formData: object) => {
    const stepperSupporterApprover = await superValidate(
        formData,
        _stepperSupporterApprover,
    );

    if (!stepperSupporterApprover.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperSupporterApprover);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperSupporterApprover),
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
    return { stepperSupporterApprover };
};

export const load = async () => {
    const stepperApplicationValidation = await superValidate(
        _stepperApplicationValidation,
    );
    const stepperSupporterApprover = await superValidate(
        _stepperSupporterApprover,
    );

    return {
        stepperApplicationValidation,
        stepperSupporterApprover,
    };
};
