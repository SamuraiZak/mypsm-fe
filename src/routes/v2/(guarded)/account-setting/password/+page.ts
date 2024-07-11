import { invalidateAll } from '$app/navigation';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import {
    AccountUpdatePasswordSchema,
    type AccountUpdatePasswordDTO,
} from '$lib/schemas/core/user-account.schema';
import { AccountServices } from '$lib/services/implementation/core/user-account/user-account.service';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load() {
    const updatePasswordForm = await superValidate(
        zod(AccountUpdatePasswordSchema),
    );

    return {
        forms: {
            updatePasswordForm,
        },
    };
}

export const _submitUpdatePasswordForm = async (
    params: AccountUpdatePasswordDTO,
) => {
    const form = await superValidate(params, zod(AccountUpdatePasswordSchema));

    if (form.valid) {
        const response: CommonResponseDTO = await AccountServices.updatePassword(params);

        return response;
    } else {
        return fail(400, form);
    }
};
