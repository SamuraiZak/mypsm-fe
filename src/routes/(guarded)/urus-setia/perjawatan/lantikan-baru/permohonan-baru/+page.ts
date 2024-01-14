import http from '$lib/services/core/http.service.js';
import { showLoadingOverlay } from '$lib/stores/globalState';
import {
    CommonViewModelConvert,
    type CommonViewModel,
} from '$lib/view-models/core/common-view-model';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// creating schema
export const _addNewHireSchema = z.object({
    tempId: z.string(),
    email: z.string().email(),
});

export const load = async () => {
    const form = await superValidate(_addNewHireSchema);
    return { form };
};

export const _submit = async (formData: object) => {
    showLoadingOverlay.set(true);
    const response: Response = await http
        .post('http://127.0.0.1:3333/api/v1/employments/new-hire', {
            body: JSON.stringify(formData),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            prefixUrl: '',
        })
        .json();

    const data: CommonViewModel = CommonViewModelConvert.fromJson(
        JSON.stringify(response),
    );

    console.log(data.status);

    showLoadingOverlay.set(false);

    toast.success('Berjaya disimpan!', {
        style: 'background: #333; color: #fff;',
    });

    if (data.status == 201) {
        toast.success('Berjaya disimpan!', {
            style: 'background: #333; color: #fff;',
        });
    } else {
        toast.error('Sila pastikan maklumat adalah lengkap dengan tepat.', {
            style: 'background: #333; color: #fff;',
        });
    }

    const form = await superValidate(_addNewHireSchema);
    return { form };
    
};
