// import http from '$lib/services/core/http.service.js';
import api from '$lib/services/core/ky.service';
import { fail } from '@sveltejs/kit';
// import { showLoadingOverlay } from '$lib/stores/globalState';
import { getErrorToast, getPromiseToast } from '$lib/toast/toast-service';
// import {
//     CommonViewModelConvert,
//     type CommonViewModel,
// } from '$lib/view-models/core/common-view-model';
// import toast from 'svelte-french-toast';
import { goto } from '$app/navigation';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// creating schema
export const _addNewHireSchema = z.object({
    tempId: z
        .string({ required_error: 'Sila tetapkan ID sementara calon' })
        .min(1, { message: 'ID hendaklah lebih daripada 1 angka' }),
    email: z
        .string()
        .email({ message: 'Pastikan emel adalah betul dan lengkap' }),
});

export const load = async () => {
    const form = await superValidate(_addNewHireSchema);
    return { form };
};

export const _submit = async (formData: object) => {
    // showLoadingOverlay.set(true);

    const form = await superValidate(formData, _addNewHireSchema);

    if (!form.valid) {
        getErrorToast();
        return fail(400, form);
    }

    const response: Promise<Response> = api
        .post('api/v1/employments/new-hire', {
            body: JSON.stringify(form),
        })
        .json();

    getPromiseToast(response).then(() => {
        goto('../lantikan-baru');
    });

    // const data: CommonViewModel = CommonViewModelConvert.fromJson(
    //     JSON.stringify(response),
    // );

    // console.log(data.status);

    // showLoadingOverlay.set(false);

    // toast.success('Berjaya disimpan!', {
    //     style: 'background: #333; color: #fff;',
    // });

    // if (data.status == 201) {
    //     toast.success('Berjaya disimpan!', {
    //         style: 'background: #333; color: #fff;',
    //     });
    // } else {
    //     toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
    //         style: 'background: #333; color: #fff;',
    //     });
    // }

    // const form = await superValidate(_addNewHireSchema);
    return { form };
};
