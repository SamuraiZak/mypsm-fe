import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

//Permohonan Persaraan
const dateStepperPermohonanPersaraan = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })
    .max(new Date(), {
        message: 'Tarikh lepas tidak boleh lebih dari tarikh semasa.',
    });

// const exampleFormSchema = z.object({
//     earlyRetirementDate: dateStepperPermohonanPersaraan.refine(
//         (value) => value >= new Date(earlyRetirementApplicationDate),
//         {
//             message:
//                 'Tidak boleh kurang daripada tarikh permohonan bersara awal',
//         },
//     ),
//     earlyRetirementApplicationDate: dateStepperPermohonanPersaraan.refine(
//         (value) => value <= new Date(earlyRetirementDate),
//         {
//             message: 'Tidak boleh lebih daripada tarikh bersara awal',
//         },
//     ),
// });

const stepperPermohonanPersaraan = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

//Permohonan Persaraan Schema
export const _stepperPermohonanPersaraan = z.object({
    earlyRetirementApplicationDate: dateStepperPermohonanPersaraan.refine(
        (date) => date.toLocaleDateString(),
    ),
    earlyRetirementDate: dateStepperPermohonanPersaraan.refine((date) =>
        date.toLocaleDateString(),
    ),
    applicationPurpose: stepperPermohonanPersaraan,
});

//Async
export const load = async () => {
    const stepperPermohonanPersaraan = await superValidate(
        _stepperPermohonanPersaraan,
    );

    return {
        stepperPermohonanPersaraan,
    };
};

//Submit Form Stepper Permohonan Persaraan
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
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperPermohonanPersaraan),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log('Response Returned: PermohonanPersaraan-54', json);
            });
    }
    return { stepperPermohonanPersaraan };
};
