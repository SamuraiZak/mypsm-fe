import { goto } from '$app/navigation';
import type { AuthenticationResponseDTO } from '$lib/dto/core/authentication/authentication.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { AuthenticationHelper } from '$lib/helpers/core/authentication.helper';
import {
    AuthenticationRequestSchema,
    type AuthenticationRequestDTO,
} from '$lib/schemas/core/authentication.schema';
import { AuthenticationServices } from '$lib/services/implementation/core/authentication/authentication.service';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load() {
    // create form
    const loginForm = await superValidate(zod(AuthenticationRequestSchema));

    return {
        forms: {
            loginForm,
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
                goto('/halaman-utama');
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
