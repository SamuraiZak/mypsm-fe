import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Verification Retirement Application
const longTextField = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const resultOption = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperRevisionSalaryMovementSchedule = z.object({
    meetingActionRemark: longTextField,
    meetingResultOption: resultOption,
});

export const _submitFormStepperRevisionSalaryMovementSchedule = async (
    formData: object,
) => {
    const stepperRevisionSalaryMovementSchedule = await superValidate(
        formData,
        _stepperRevisionSalaryMovementSchedule,
    );

    if (!stepperRevisionSalaryMovementSchedule.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperRevisionSalaryMovementSchedule);
    } const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperRevisionSalaryMovementSchedule),
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
    return { stepperRevisionSalaryMovementSchedule };
};

//Async
export const load = async () => {
    const stepperRevisionSalaryMovementSchedule = await superValidate(
        _stepperRevisionSalaryMovementSchedule,
    );

    return {
        stepperRevisionSalaryMovementSchedule,
    };
};