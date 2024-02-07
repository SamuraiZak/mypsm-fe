import { goto } from '$app/navigation';
import type { AuthRequestDTO } from '$lib/dto/core/auth/auth-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import {
    getLoadingToast,
    getLoginErrorToast,
    getLoginSuccessToast,
} from '$lib/services/core/toast/toast-service';
import { AuthService } from '$lib/services/implementations/core/auth/authentication.service';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const username = z
    .string({ required_error: 'Ruangan ini tidak boleh dibiarkan kosong' })
    .min(4, {
        message: 'Ruangan ini hendaklah diisi degan tidak kurang dari 4 aksara',
    })
    .trim();

const password = z
    .string({ required_error: 'Ruangan ini tidak boleh dibiarkan kosong' })
    .min(4, {
        message: 'Ruangan ini hendaklah diisi dengan tidak kurang dari 4 aksara',
    })
    .trim();

// creating schema
export const _cliniLoginSchema = z.object({
    idType: z.string(),
    userGroup: z.string(),
    username: username,
    password: password,
    currentRole: z.string(),
});

export const load = async () => {
    const form = await superValidate(_cliniLoginSchema);
    return { form };
};

export const _submit = async (formData: AuthRequestDTO) => {
    getLoadingToast();

    const response: CommonResponseDTO = await AuthService.authenticateUser(
        formData,
    ).finally(() => toast.dismiss());

    if (response.status == 'success') {
        let accountRes = await AuthService.getFullName();

        getLoginSuccessToast().finally(() =>
            setTimeout(() => {
                goto('/klinik-panel/halaman-utama');
            }, 2000),
        );
    } else {
        getLoginErrorToast();
    }
};
