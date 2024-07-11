import { goto } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import type { AuthenticationResponseDTO } from '$lib/dto/core/authentication/authentication.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { AuthenticationHelper } from '$lib/helpers/core/authentication.helper';
import {
    AuthenticationRequestSchema,
    type AuthenticationRequestDTO,
} from '$lib/schemas/core/authentication.schema';
import {
    AccountPasswordResetSchema,
    type AccountPasswordResetDTO,
} from '$lib/schemas/core/user-account.schema';
import { AuthenticationServices } from '$lib/services/implementation/core/authentication/authentication.service';
import { AccountServices } from '$lib/services/implementation/core/user-account/user-account.service';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load() {
    // create login form
    const loginForm = await superValidate(zod(AuthenticationRequestSchema));

    // create password reset form
    const resetPasswordForm = await superValidate(
        zod(AccountPasswordResetSchema),
    );

    return {
        forms: {
            loginForm,
            resetPasswordForm,
        },
    };
}

export const _submitLoginForm = async (params: AuthenticationRequestDTO) => {
    const form = await superValidate(params, zod(AuthenticationRequestSchema));

    try {
        const response: CommonResponseDTO =
            await AuthenticationServices.authenticate(params);

        if (response.status == 'success') {
            const isStored: boolean =
                await AuthenticationHelper.storeAccessToken(
                    response.data?.details as AuthenticationResponseDTO,
                );

            if (isStored) {
                goto('/v2/dashboard');
            } else {
                return fail(400, form);
            }
        } else {
            return fail(400, form);
        }
    } catch (error) {
        return fail(400, form);
    }
};

export const _submitResetPasswordForm = async (
    params: AccountPasswordResetDTO,
) => {
    const form = await superValidate(params, zod(AccountPasswordResetSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await AccountServices.resetPassword(params);

        if (response.status == 'success') {
            return response;
        } else {
            return CommonResponseConstant.httpError;
        }
    } else {
        return CommonResponseConstant.httpError;
    }
};
