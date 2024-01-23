import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// RetirementApplicationSupporter
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

export const _stepperRetirementApplicationSupporter = z.object({
    actionRemark: longTextFieldRV,
    resultOption: resultOptionRV,
});

export const _submitFormStepperRetirementApplicationSupporter = async (
    formData: object,
) => {
    const stepperRetirementApplicationSupporter = await superValidate(
        formData,
        _stepperRetirementApplicationSupporter,
    );

    if (!stepperRetirementApplicationSupporter.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperRetirementApplicationSupporter);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperRetirementApplicationSupporter),
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
    return { stepperRetirementApplicationSupporter };
};

//Async
export const load = async () => {
    const stepperRetirementApplicationSupporter = await superValidate(
        _stepperRetirementApplicationSupporter,
    );

    return {
        stepperRetirementApplicationSupporter,
    };
};
