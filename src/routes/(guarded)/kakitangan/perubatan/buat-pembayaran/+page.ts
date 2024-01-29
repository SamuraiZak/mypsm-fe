import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const date = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

export const _stepperOnlineTransaction = z.object({
    transactionDate: date.refine(
        (data) => data <= new Date(),
        { message: 'Tidak boleh lebih daripada tarikh semasa' },
    ),
});

export const _submitFormStepperOnlineTransaction = async (
    formData: object,
) => {
    const stepperOnlineTransaction = await superValidate(
        formData,
        _stepperOnlineTransaction,
    );

    if (!stepperOnlineTransaction.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperOnlineTransaction);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperOnlineTransaction),
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
    return { stepperOnlineTransaction };
};

export const load = async () => {
    const stepperOnlineTransaction = await superValidate(
        _stepperOnlineTransaction,
    );

    return {
        stepperOnlineTransaction,
    };
};