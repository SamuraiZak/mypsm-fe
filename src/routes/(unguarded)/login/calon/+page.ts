import { goto } from '$app/navigation';
import {
    getLoginErrorToast,
    getLoginSuccessToast,
} from '$lib/services/core/toast/toast-service';
import { AuthService } from '$lib/services/implementations/core/auth/authentication.service';
import type { AuthenticationRequestViewModel } from '$lib/view-models/core/auth/auth-request.view-model';
import type { AuthenticationResponseViewModel } from '$lib/view-models/core/auth/auth-response.view-model';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// creating schema
export const _calonLoginSchema = z.object({
    idType: z.string(),
    userGroup: z.string(),
    username: z.string().min(5),
    password: z.string().min(5),
    currentRole: z.string(),
});

export const load = async () => {
    const form = await superValidate(_calonLoginSchema);
    return { form };
};

export const _submit = async (formData: AuthenticationRequestViewModel) => {
    const response: AuthenticationResponseViewModel =
        await AuthService.loginCandidate(formData);
    if (response.status === 200) {
        getLoginSuccessToast().finally(() =>
            setTimeout(() => goto('/calon/halaman-utama'), 2000),
        );
    } else {
        getLoginErrorToast();
    }
};
