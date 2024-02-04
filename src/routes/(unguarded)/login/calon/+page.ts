import { goto } from '$app/navigation';
import {
    AuthRequestConvert,
    type AuthRequestDTO,
} from '$lib/dto/core/auth/auth-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import {
    getErrorToast,
    getLoginErrorToast,
} from '$lib/services/core/toast/toast-service';
import { AuthService } from '$lib/services/implementations/core/auth/authentication.service';
import http from '$lib/services/provider/service-provider.service';
import { loadingState, showLoadingOverlay } from '$lib/stores/globalState';
import { fail } from '@sveltejs/kit';
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

export const _submit = async (formData: AuthRequestDTO) => {
    const form = await superValidate(formData, _calonLoginSchema);

    // check if form valid
    if (form.valid) {
        // show loading screen
        loadingState.set(true);

        const response: CommonResponseDTO =
            await AuthService.authenticateUser(formData);

        if (response.status == 'success') {
            let accountRes = await AuthService.getFullName();
            loadingState.set(false);
            goto('/calon/halaman-utama');
        } else {
            loadingState.set(false);
            getLoginErrorToast();
        }
    } else {
        return fail(400, form);
    }
};
