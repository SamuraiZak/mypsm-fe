import { getErrorToast, getPromiseToast } from '$lib/toast/toast-service';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const shortTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();
const longTextSchema = z
    .string({ required_error: 'Medan ini tidak boleh kosong.' })
    .min(4, {
        message: 'Medan ini hendaklah lebih daripada 4 karakter.',
    })
    .max(124, {
        message: 'Medan ini tidak boleh melebihi 124 karakter.',
    })
    .trim();

const generalSelectSchema = z
    .string()
    .min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _butiranPinjamanForm = z.object({
    jumlahYangDipohon: shortTextSchema,
    tempohPembayaran: generalSelectSchema,
});


export const load = async () => {
    const butiranPinjamanForm = await superValidate(_butiranPinjamanForm);


    return {
        butiranPinjamanForm,



    };
};

export const _submitButiranPinjamanForm = async (formData: object) => {
    const form = await superValidate(formData, _butiranPinjamanForm);

    if (!form.valid) {
        getErrorToast();
        console.log('experience personal form');
        return fail(400, form);
    }

    const responsePromise = fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        },
    )
        .then((response) => response.json())
        .then((json) => console.log('Response: ', json));

    getPromiseToast(responsePromise);
    return { form };
};
