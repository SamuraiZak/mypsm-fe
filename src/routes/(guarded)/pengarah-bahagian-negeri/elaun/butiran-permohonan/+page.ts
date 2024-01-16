import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Allowance Application Support
const resultOption = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

const stepperAllowanceApplicationSupport = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperAllowanceApplicationSupport = z.object({
    actionRemark: stepperAllowanceApplicationSupport,
    resultOption: resultOption,
});

export const _submitFormStepperAllowanceApplicationSupport = async (
    formData: object,
) => {
    const stepperAllowanceApplicationSupport = await superValidate(
        formData,
        _stepperAllowanceApplicationSupport,
    );

    if (!stepperAllowanceApplicationSupport.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperAllowanceApplicationSupport);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperAllowanceApplicationSupport),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log(
                    'Response Returned: AllowanceApplicationSupport-54',
                    json,
                );
            });
    }
    return { stepperAllowanceApplicationSupport };
};

//Async
export const load = async () => {
    const stepperAllowanceApplicationSupport = await superValidate(
        _stepperAllowanceApplicationSupport,
    );

    return {
        stepperAllowanceApplicationSupport,
    };
};