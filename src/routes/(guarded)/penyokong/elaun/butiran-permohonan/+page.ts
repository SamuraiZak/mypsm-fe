import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Supporter Approver
const resultOption = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

const stepperSupporterApprover = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperSupporterApprover = z.object({
    actionRemark: stepperSupporterApprover,
    resultOption: resultOption,
});

export const _submitFormStepperSupporterApprover = async (
    formData: object,
) => {
    const stepperSupporterApprover = await superValidate(
        formData,
        _stepperSupporterApprover,
    );

    if (!stepperSupporterApprover.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperSupporterApprover);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperSupporterApprover),
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
                    'Response Returned: SupporterApprover-54',
                    json,
                );
            });
    }
    return { stepperSupporterApprover };
};

//Async
export const load = async () => {
    const stepperSupporterApprover = await superValidate(
        _stepperSupporterApprover,
    );

    return {
        stepperSupporterApprover,
    };
};