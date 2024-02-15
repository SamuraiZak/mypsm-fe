import { getErrorToast, getPromiseToast } from '$lib/helpers/core/toast.helper';
import { ExampleServices } from '$lib/services/implementation/example/example.service';
import { error } from '@sveltejs/kit';
// import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

export const _playgroundUserSchema = z
    .object({
        name: z
            .string()
            .min(5, {
                message: 'Ruangan ini harus diisi tidak kurang dari 5 aksara',
            })
            .trim(),
        identityNumber: z.coerce
            .string()
            .min(12, { message: 'Tidak boleh kurang 12 karakter' })
            .max(12, { message: 'Tidak boleh lebih 12 karakter' }),
        birthDate: z.date({ required_error: 'Tarikh tidak boleh kosong.' }),
        isMarried: z.boolean(),
        spouseName: z.string(),
    })
    .refine((data) => !data.isMarried && data.spouseName === '', {
        message: 'Tidak boleh kosong.',
        path: ['spouseName'], // path of error
    });

type User = z.infer<typeof _playgroundUserSchema>;

export const load = async () => {
    const user: User = {
        name: 'calvin',
        identityNumber: '112233445566',
        birthDate: new Date(),
        isMarried: true,
        spouseName: '',
    };

    const form = await superValidate(user, _playgroundUserSchema);

    form.data.isMarried = false;
    return { form };
};

export const _submit = async (param: object) => {
    const form = await superValidate(param, _playgroundUserSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'validation failed' });
    }

    const response = ExampleServices.postExampleDetail(param);

    getPromiseToast(response);

    return { response };
};
