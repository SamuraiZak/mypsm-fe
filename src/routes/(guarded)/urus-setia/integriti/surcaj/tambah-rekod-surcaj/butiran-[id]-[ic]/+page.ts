import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Butiran Surcaj
const dateStepperButiranSurcaj = z.coerce
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

const stepperButiranSurcaj = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

export const _stepperButiranSurcaj = z.object({
    reportedDate: dateStepperButiranSurcaj.refine((date) =>
        date.toLocaleDateString(),
    ),
    surchargeAction: stepperButiranSurcaj,
    remark: stepperButiranSurcaj,
});

export const _submitFormStepperButiranSurcaj = async (formData: object) => {
    const stepperButiranSurcaj = await superValidate(
        formData,
        _stepperButiranSurcaj,
    );

    if (!stepperButiranSurcaj.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperButiranSurcaj);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperButiranSurcaj),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log('Response Returned: ButiranSurcaj-54', json);
            });
    }
    return { stepperButiranSurcaj };
};

//Butiran Mesyuarat
const dateStepperButiranMesyuarat = z.coerce
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

const stepperButiranMesyuarat = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const butiranMesyuaratSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _stepperButiranMesyuarat = z.object({
    meetingDate: dateStepperButiranMesyuarat.refine((date) =>
        date.toLocaleDateString(),
    ),
    effectiveDate: dateStepperButiranMesyuarat.refine((date) =>
        date.toLocaleDateString(),
    ),
    surchargeAmount: stepperButiranMesyuarat,
    meetingDropdown: butiranMesyuaratSelectSchema,
    paymentDropdown: butiranMesyuaratSelectSchema,
    paymentPeriodDropdown: butiranMesyuaratSelectSchema,
});

export const _submitFormStepperButiranMesyuarat = async (formData: object) => {
    const stepperButiranMesyuarat = await superValidate(
        formData,
        _stepperButiranMesyuarat,
    );

    if (!stepperButiranMesyuarat.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, stepperButiranMesyuarat);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(stepperButiranMesyuarat),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log('Response Returned: ButiranSurcaj-54', json);
            });
    }
    return { stepperButiranMesyuarat };
};

//Async
export const load = async () => {
    const stepperButiranSurcaj = await superValidate(_stepperButiranSurcaj);
    const stepperButiranMesyuarat = await superValidate(
        _stepperButiranMesyuarat,
    );

    return {
        stepperButiranSurcaj,
        stepperButiranMesyuarat,
    };
};
