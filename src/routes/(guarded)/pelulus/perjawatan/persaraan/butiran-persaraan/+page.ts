import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Retirement Application Approval
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

export const _stepperRetirementApplicationApproval = z.object({
    actionRemark: longTextFieldRV,
    resultOption: resultOptionRV,
});

export const _submitFormStepperRetirementApplicationApproval = async (
    formData: object,
) => {
    const stepperRetirementApplicationApproval = await superValidate(
        formData,
        _stepperRetirementApplicationApproval,
    );

    if (!stepperRetirementApplicationApproval.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperRetirementApplicationApproval);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperRetirementApplicationApproval),
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
    return { stepperRetirementApplicationApproval };
};

//Async
export const load = async () => {
    const stepperRetirementApplicationApproval = await superValidate(
        _stepperRetirementApplicationApproval,
    );

    return {
        stepperRetirementApplicationApproval,
    };
};
