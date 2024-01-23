import { getPromiseToast } from '$lib/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Annual Salary Increment
const annualSalaryIncrement = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _annualSalaryIncrement = z.object({
    supporterName: annualSalaryIncrement,
    approverName: annualSalaryIncrement,
});

export const _submitFormAnnualSalaryIncrement = async (formData: object) => {
    const annualSalaryIncrement = await superValidate(
        formData,
        _annualSalaryIncrement,
    );

    if (!annualSalaryIncrement.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, annualSalaryIncrement);
    } const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_annualSalaryIncrement),
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
    return { annualSalaryIncrement };
};

//Async
export const load = async () => {
    const annualSalaryIncrement = await superValidate(
        _annualSalaryIncrement,
    );

    return {
        annualSalaryIncrement,
    };
};
