import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Staff Info
const textField = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperStaffInfo = z.object({
    name: textField,
    staffId: textField,
    idNumber: textField,
});

export const _submitFormStepperStaffInfo = async (
    formData: object,
) => {
    const stepperStaffInfo = await superValidate(
        formData,
        _stepperStaffInfo,
    );

    if (!stepperStaffInfo.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperStaffInfo);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperStaffInfo),
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
    return { stepperStaffInfo };
};

export const load = async () => {
    const stepperStaffInfo = await superValidate(
        _stepperStaffInfo,
    );
    

    return {
        stepperStaffInfo,
    };
};
