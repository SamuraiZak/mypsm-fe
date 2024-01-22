import { error, fail } from '@sveltejs/kit';
import { getErrorToast, getPromiseToast } from '$lib/toast/toast-service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from "zod";

// ===================================================
// General Form Schema
// ===================================================

const generalSelectSchema = z.string().min(1, { message: "Sila tetapkan pilihan anda. " });


const shortTextSchema = z
.string({ required_error: 'Medan ini tidak boleh kosong.' })
.min(4, {
    message: 'Medan ini hendaklah lebih daripada 4 karakter.',
})
.max(124, {
    message: 'Medan ini tidak boleh melebihi 124 karakter.',
})
.trim();

const maxDateSchema = z.coerce
    .date({
        errorMap: (issue, { defaultError }) => ({
            message:
                issue.code === 'invalid_date'
                    ? 'Tarikh tidak boleh dibiar kosong.'
                    : defaultError,
        }),
    })
    .max(new Date(), {
        message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
    });

const booleanSchema = z.boolean({
    required_error: 'Sila tetapkan pilihan anda.',
    invalid_type_error: 'Medan ini haruslah jenis boolean.',
});

export const _keputusanPengesahan = z.object({
    namaBilanganMesyuarat:shortTextSchema,
    tindakanUlasan: shortTextSchema,
    faedahPersaraan: generalSelectSchema,
    tarikhMesyuarat: maxDateSchema,

})





export const load = async () => {
    const keputusanPengesahan = await superValidate(_keputusanPengesahan);
    return {
        keputusanPengesahan,
      };
   };






   export const _submitKeputusanPengesahan = async (formData: object) => {
    const form = await superValidate(formData, _keputusanPengesahan);

    console.log('Request: ', form.data);
    if (!form.valid) {
        getErrorToast();
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
        .then((json) => {
            console.log('Response Returned: ', json);
        });

    getPromiseToast(responsePromise);

    const response = await responsePromise;

    return { response };
};
