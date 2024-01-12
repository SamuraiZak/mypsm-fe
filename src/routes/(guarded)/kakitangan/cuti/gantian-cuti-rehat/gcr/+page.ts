import { error, fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';


const generalSelectSchema = z.string().min(1, { message: 'Sila tetapkan pilihan anda.' });

export const _staffDetailSchema = z.object({
    gred: generalSelectSchema,
    placement: generalSelectSchema,
    group: generalSelectSchema,
    totalLeaveCollection: generalSelectSchema,
});

export const load = async ({ fetch }) => {
    const request = await fetch(`https://jsonplaceholder.typicode.com/users/`);
    if (request.status >= 400) error;

    const userData = await request.json();
    const form = await superValidate(
        userData,
        _staffDetailSchema,
    );

    return { form };
};

export const _submitLeaveReplacementForm = async (formData: Object) => {

    const form = await superValidate(formData, _staffDetailSchema);

    if (!form.valid) {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
        return fail(400, form);
    } else {
        console.log('Request Body: ', formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log('Response Returned: ', json);
            });
    }
    
    return { form };
};