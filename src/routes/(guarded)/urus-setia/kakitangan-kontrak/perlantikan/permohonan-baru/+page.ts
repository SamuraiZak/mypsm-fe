import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// New Appointments
const email = z
    .string()
    .min(1, { message: 'Medan ini latihan tidak boleh kosong.' })
    .email('Emel ini tidak sah.');

const newAppointments = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const number = z
    .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
    .min(1, {
        message: 'Medan ini hendaklah mempunyai nilai.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const date = z.coerce
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

const option = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _newAppointments = z.object({
    name: newAppointments,
    candidateId: newAppointments,
    email: email,
    contractDuration: number,
    wageRates: number,
    jobTitle: newAppointments,
    contractStartDate: date.refine((date) => date.toLocaleDateString()),
    contractEndDate: date.refine((date) => date.toLocaleDateString()),
    reportDate: date.refine((date) => date.toLocaleDateString()),
    contractPlacementDropdown: option,
    generatedLink: newAppointments,
});

export const _submitFormNewAppointments = async (formData: object) => {
    const newAppointments = await superValidate(formData, _newAppointments);

    if (!newAppointments.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, newAppointments);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(newAppointments),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log('Response Returned: AllowanceApplication-54', json);
            });
    }
    return { newAppointments };
};

//Async
export const load = async () => {
    const newAppointments = await superValidate(_newAppointments);

    return {
        newAppointments,
    };
};
