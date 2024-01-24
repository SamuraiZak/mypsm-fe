// import http from '$lib/services/core/http.service.js';
import { fail } from '@sveltejs/kit';
// import { showLoadingOverlay } from '$lib/stores/globalState';
import { getErrorToast, getPromiseToast } from '$lib/services/core/toast/toast-service';
// import {
//     CommonViewModelConvert,
//     type CommonViewModel,
// } from '$lib/view-models/core/common-view-model';
// import toast from 'svelte-french-toast';
import { goto } from '$app/navigation';
import http from '$lib/services/provider/service-provider.service';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// creating schema
export const _addNewHireSchema = z.object({
    tempId: z.coerce
        .string({
            required_error: 'Sila tetapkan ID sementara calon',
            invalid_type_error: 'Id hendaklah terdiri daripada nombor sahaja',
        })
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

    const response = http
        .post('employments/add-new-hire', {
            body: JSON.stringify(form.data),
        })
        .json();

    getPromiseToast(response).then(() => {
        setTimeout(() => {
            goto('../lantikan-baru');
        }, 2500);
    });

    return { form };
};
