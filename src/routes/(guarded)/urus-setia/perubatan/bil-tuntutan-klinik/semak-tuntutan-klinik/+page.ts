import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

//Claim Info
const textField = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const number = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(1, {
        message: 'Medan ini hendaklah mempunyai karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperClaimInfo = z.object({
    month: textField,
    totalClaimed: number,
    claimedId: number,
});
// modal
export const _stepperAction = z.object({
    clinicAction: textField.nullable(),
    action: textField.nullable(),

});

export const _submitFormStepperClaimInfo = async (
    formData: object,
) => {
    const stepperClaimInfo = await superValidate(
        formData,
        _stepperClaimInfo,
    );

    if (!stepperClaimInfo.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperClaimInfo);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperClaimInfo),
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
    return { stepperClaimInfo };
};


// modal

export const _submitFormStepperAction = async (
    formData: object,
) => {
    const stepperAction = await superValidate(
        formData,
        _stepperAction,
    );

    if (!stepperAction.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperAction);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperClaimInfo),
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
    return { stepperAction };
};

export const load = async () => {
    const stepperClaimInfo = await superValidate(
        _stepperClaimInfo,
    );
    const stepperAction = await superValidate(
        _stepperAction,
    );


    return {
        stepperClaimInfo,
        stepperAction,
    };
};
