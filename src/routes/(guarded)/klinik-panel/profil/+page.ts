import { getPromiseToast } from '$lib/services/core/toast/toast-service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// Profile
const textField = z
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
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const date = z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
        message:
            issue.code === 'invalid_date'
                ? 'Tarikh tidak boleh dibiar kosong.'
                : defaultError,
    }),
});

export const _profile = z.object({
    clinicCode: textField,
    name: textField,
    address: textField,
    postcode: number,
    city: textField,
    state: textField,
    contactNumber: number,
    bank: textField,
    accountNumber: number,
    panelAppointedDate: date.refine((data) => data >= new Date(), {
        message: 'Tidak boleh kurang atau pada tarikh semasa',
    }),
    panelContractEndDate: date.refine((data) => data >= new Date(), {
        message: 'Tidak boleh kurang atau pada tarikh semasa',
    }),
});

export const _submitFormProfile = async (formData: object) => {
    const profile = await superValidate(formData, _profile);

    if (!profile.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        console.log(profile);
        return fail(400, profile);
    }
    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(_profile),
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
    return { profile };
};

export const load = async () => {
    const profile = await superValidate(_profile);

    return {
        profile,
    };
};
