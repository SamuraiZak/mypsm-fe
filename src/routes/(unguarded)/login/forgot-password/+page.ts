import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserGroupConstant } from '$lib/constants/core/user-group.constant';
import type { ResetPasswordDTO } from '$lib/dto/core/account/reset-password.dto';
import type { AuthenticationRequestDTO } from '$lib/dto/core/authentication/authentication-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type { UserGroupDTO } from '$lib/dto/core/user-group/user-group.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { AccountServices } from '$lib/services/implementation/core/account/account.service';
import { AuthService } from '$lib/services/implementation/core/auth/authentication.service';
import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/client';
import { Schema, z } from 'zod';

export const _forgotPasswordSchema = z.object({
    email: z.string().email(),
});

// on page load
export const load = async () => {
    // create form
    const form = await superValidate(zod(_forgotPasswordSchema));

    return {
        props: {
            form,
        },
    };
};

// on login form submit
export const _submit = async (formData: ResetPasswordDTO) => {
    const form = await superValidate(formData, zod(_forgotPasswordSchema));

    let requestSuccess: boolean | null = null;

    if (form.valid) {
        const response: CommonResponseDTO =
            await AccountServices.forgotPassword(formData);

        if (response.status == 'success') {
            requestSuccess = true;
        } else {
            requestSuccess = false;
        }

        return {
            requestSuccess,
        };
    } else {
        return requestSuccess;
    }
};
