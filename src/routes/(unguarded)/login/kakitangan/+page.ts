import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key-constant';
import { AuthService } from '$lib/services/implementations/core/auth/authentication.service';
import { LookupService } from '$lib/services/implementations/core/lookup/lookup.services';
import type { AuthenticationRequestViewModel } from '$lib/view-models/core/auth/auth-request.view-model';
import type { AuthenticationResponseViewModel } from '$lib/view-models/core/auth/auth-response.view-model';
import type { EnumLoginIDTypeResponseViewModel } from '$lib/view-models/core/lookup/id-type/id-type-enum-response.view-model';
import type { EnumRoleResponseViewModel } from '$lib/view-models/core/lookup/role/role-enum-reponse.view-model';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

// creating schema
export const _kakitanganLoginSchema = z.object({
    idType: z.string(),
    userGroup: z.string(),
    username: z.string().min(5),
    password: z.string().min(5),
    currentRole: z.string(),
});

export const load = async () => {
    const form = await superValidate(_kakitanganLoginSchema);

    // get role list
    const roleResponse: EnumRoleResponseViewModel = await AuthService.getRoleOptions();

    return { form, roleResponse };
};

export const _submit = async (formData: AuthenticationRequestViewModel) => {
    const response: AuthenticationResponseViewModel = await AuthService.loginEmployee(formData);
    if (response.status == 200) {
        

        goto('/kakitangan/halaman-utama');
    }
};
