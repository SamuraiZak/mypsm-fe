import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Invoice Info
const dropdown = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperInvoiceInfo = z.object({
    name: dropdown,
    treatmentMonth: dropdown,
    treatmentYear: dropdown,
});

export const _submitFormStepperInvoiceInfo = async (formData: object) => {
    const stepperInvoiceInfo = await superValidate(
        formData,
        _stepperInvoiceInfo,
    );

    if (!stepperInvoiceInfo.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperInvoiceInfo);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperInvoiceInfo),
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
    return { stepperInvoiceInfo };
};

//Async
export const load = async () => {
    const stepperInvoiceInfo = await superValidate(
        _stepperInvoiceInfo,
    );

    return {
        stepperInvoiceInfo,
    };
};