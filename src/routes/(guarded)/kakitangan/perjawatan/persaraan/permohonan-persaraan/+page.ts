import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const dateStepperPermohonanPersaraan = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

const stepperPermohonanPersaraan = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperPermohonanPersaraan = z.object({
    earlyRetirementDate: dateStepperPermohonanPersaraan.refine(
        (data) => data >= new Date(),
        { message: 'Tidak boleh kurang atau pada tarikh semasa' },
    ),
    earlyRetirementApplicationDate: dateStepperPermohonanPersaraan.refine(
        (data) => data <= new Date(),
        { message: 'Tidak boleh lebih daripada tarikh semasa' },
    ),
    applicationPurpose: stepperPermohonanPersaraan,
});

export const _submitFormStepperPermohonanPersaraan = async (
    formData: object,
) => {
    const stepperPermohonanPersaraan = await superValidate(
        formData,
        _stepperPermohonanPersaraan,
    );

    if (!stepperPermohonanPersaraan.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperPermohonanPersaraan);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_stepperPermohonanPersaraan),
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
    return { stepperPermohonanPersaraan };
};

export const load = async () => {
    const stepperPermohonanPersaraan = await superValidate(
        _stepperPermohonanPersaraan,
    );

    return {
        stepperPermohonanPersaraan,
    };
};
