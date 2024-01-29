import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Secretary Result
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

export const _stepperSecretaryResult = z.object({
    remark: longTextField,
    resultOption: option,
});

export const _submitFormStepperSecretaryResult = async (
    formData: object,
) => {
    const stepperSecretaryResult = await superValidate(
        formData,
        _stepperSecretaryResult,
    );

    if (!stepperSecretaryResult.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperSecretaryResult);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperSecretaryResult),
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
    return { stepperSecretaryResult };
};

export const load = async () => {
    const stepperSecretaryResult = await superValidate(
        _stepperSecretaryResult,
    );

    return {
        stepperSecretaryResult,
    };
};
