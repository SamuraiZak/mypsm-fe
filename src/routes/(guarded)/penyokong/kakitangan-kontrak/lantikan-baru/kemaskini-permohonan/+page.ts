import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Result From Roles
const resultOption = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

const stepperResultFromRoles = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperResultFromRoles = z.object({
    actionRemark: stepperResultFromRoles,
    resultOption: resultOption,
});

export const _submitFormStepperResultFromRoles = async (
    formData: object,
) => {
    const stepperResultFromRoles = await superValidate(
        formData,
        _stepperResultFromRoles,
    );

    if (!stepperResultFromRoles.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperResultFromRoles);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperResultFromRoles),
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
                    'Response Returned: ResultFromRoles-54',
                    json,
                );
            });
    }
    return { stepperResultFromRoles };
};

//Async
export const load = async () => {
    const stepperResultFromRoles = await superValidate(
        _stepperResultFromRoles,
    );

    return {
        stepperResultFromRoles,
    };
};
