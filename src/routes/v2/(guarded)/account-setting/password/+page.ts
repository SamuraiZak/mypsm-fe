import type { UpdatePasswordRequestDTO } from '$lib/dto/core/account/update-password.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { getErrorToast, getSuccessToast } from '$lib/helpers/core/toast.helper';
import { AccountServices } from '$lib/services/implementation/core/account/account.service';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// update password schema
export const _updatePasswordSchema = z
    .object({
        oldPassword: z
            .string()
            .min(5, { message: 'Kataluan hendaklah melebihi 5 aksara' }),
        newPassword: z
            .string()
            .min(5, { message: 'Kataluan hendaklah melebihi 5 aksara' }),
        confirmPassword: z
            .string()
            .min(5, { message: 'Kataluan hendaklah melebihi 5 aksara' }),
    })
    .superRefine(({ confirmPassword, newPassword }, ctx) => {
        if (confirmPassword !== newPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Kata laluan tidak sepadan',
                path: ['confirmPassword'],
            });
        }
    });

export const load = async () => {
    const form = await superValidate(zod(_updatePasswordSchema));
    return { props: { form } };
};

export const _submit = async (formData: UpdatePasswordRequestDTO) => {
    const form = await superValidate(formData, zod(_updatePasswordSchema));

    if (form.valid) {
        const response: CommonResponseDTO =
            await AccountServices.updatePassword(formData);

        if (response.status == 'success') {
            getSuccessToast();
            return {
                props: {
                    response,
                },
            };
        } else {
            getErrorToast(response.message);
            return {
                props: {
                    response,
                },
            };
        }
    } else {
        getErrorToast();
    }

    // const response = await AccountServices.updatePassword(formData);
};
