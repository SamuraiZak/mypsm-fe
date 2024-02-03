import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key-constant';
import type { PwdUpdateRequestDTO } from '$lib/dto/core/auth/update-password-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import {
    getErrorToast,
    getLoginErrorToast,
} from '$lib/services/core/toast/toast-service';
import { AuthService } from '$lib/services/implementations/core/auth/authentication.service';
import http from '$lib/services/provider/service-provider.service';
import { loadingState } from '$lib/stores/globalState';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// creating schema
export const _updatePasswordSchema = z.object({
    username: z.string(),
    oldPassword: z.string().min(5),
    newPassword: z.string().min(5),
});

export const load = async () => {
    const form = await superValidate(_updatePasswordSchema);

    form.data.username =
        localStorage.getItem(LocalStorageKeyConstant.userName) ?? 'undefined';

    let result: string | null = null;
    return {
        form,
    };
};

export const _submit = async (formData: PwdUpdateRequestDTO) => {
    const form = await superValidate(formData, _updatePasswordSchema);

    // check if form valid
    if (form.valid) {
        // show loading screen
        loadingState.set(true);

        const response: CommonResponseDTO =
            await AuthService.updatePassword(formData);

        if (response.status == 'success') {
            loadingState.set(false);
            const result: string | null = 'success';
            return {
                props: {
                    result,
                },
            };
        } else {
            loadingState.set(false);
            const result: string | null = 'fail';
            return {
                props: {
                    result,
                },
            };
        }
    } else {
        return fail(400, form);
    }
};

export async function _submitForm(
    formData: PwdUpdateRequestDTO,
){
    const form = await superValidate(formData, _updatePasswordSchema);

    // check if form valid
    if (form.valid) {
        // show loading screen
        loadingState.set(true);

        const response: CommonResponseDTO =
            await AuthService.updatePassword(formData);

        if (response.status == 'success') {
            loadingState.set(false);
            const result: string | null = 'success';
            return result;
        } else {
            loadingState.set(false);
            const result: string | null = 'fail';
            return result;
        }
    } else {
        const result: string | null = 'error';
        return result;
    }
}
