import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { AccountService } from '$lib/services/implementation/core/account/account.service';
import { error } from '@sveltejs/kit';
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
    const form = await superValidate(_updatePasswordSchema);
    return { props: { form } };
};

export const _submit = async (formData: object) => {
    const form = await superValidate(formData, _updatePasswordSchema);

    if (!form.valid) {
        getErrorToast();
        error(400, { message: 'validation failed' });
    }

    const response = await AccountService.updatePassword(formData);

    return {
        props: {
            response,
        },
    };
};
