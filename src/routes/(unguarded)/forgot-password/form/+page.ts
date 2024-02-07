import { goto } from '$app/navigation';
import type { ForgotPasswordRequestDTO } from '$lib/dto/core/auth/forgot-password-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import {
    getLoadingToast,
    getPasswordResetErroToast,
    getPasswordResetSuccessToast,
} from '$lib/services/core/toast/toast-service';
import { AuthService } from '$lib/services/implementations/core/auth/authentication.service';
import http from '$lib/services/provider/service-provider.service';
import { fail } from '@sveltejs/kit';
import toast from 'svelte-french-toast';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const username = z
    .string({ required_error: 'Ruangan ini tidak boleh dibiarkan kosong' })
    .min(4, {
        message:
            'Ruangan ini hendaklah diisi dengan tidak kurang dari 4 aksara',
    })
    .trim();

// creating schema
export const _resetPasswordSchema = z.object({
    idType: z.string(),
    idValue: username,
});

export const load = async () => {
    const form = await superValidate(_resetPasswordSchema);
    return { form };
};

export const _submit = async (formData: ForgotPasswordRequestDTO) => {
    getLoadingToast();
    const form = await superValidate(formData, _resetPasswordSchema);

    if (form.valid) {
        const response: CommonResponseDTO =
            await AuthService.forgotPassword(formData);

        if (response.status == 'success') {
            getPasswordResetSuccessToast().finally(() => {
                setTimeout(() => {
                    goto('/login');
                }, 2000);
            });
        } else {
            getPasswordResetErroToast().then(() => {
                return fail(400, { form });
            });
        }
    } else {
        return fail(400, { form });
    }
};
