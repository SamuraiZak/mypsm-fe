import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserGroupConstant } from '$lib/constants/core/user-group.constant';
import type { AuthenticationRequestDTO } from '$lib/dto/core/auth/authentication-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import type { UserGroupDTO } from '$lib/dto/core/user-group/user-group.dto';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { AuthService } from '$lib/services/implementation/core/auth/authentication.service';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/client';
import { Schema, z } from 'zod';

export const _loginSchema = z.object({
    userGroup: z.string(),
    currentRole: z.string(),
    username: z.coerce
        .string()
        .trim()
        .min(5, {
            message: 'Ruangan ini harus diisi tidak kurang dari 5 aksara',
        })
        .max(12, { message: 'No. Kad Pengenalan tidah sah' }),
    password: z.string().trim().min(5, {
        message: 'Ruangan ini harus diisi tidak kurang dari 5 aksara',
    }),
});

// on page load
export const load = async () => {
    // fetch constant user group options
    const userGroupOptions: UserGroupDTO[] = UserGroupConstant.userGroup;

    // TODO: fetch role lookup
    let roleLookupList: LookupDTO[] = [
        {
            id: 1,
            code: '1',
            description: 'Kakitangan',
        },
        {
            id: 2,
            code: '2',
            description: 'Urus Setia',
        },
        {
            id: 3,
            code: '3',
            description: 'Pengarah',
        },
        {
            id: 4,
            code: '4',
            description: 'Unit Bahagian',
        },
        {
            id: 5,
            code: '5',
            description: 'Calon',
        },
        {
            id: 6,
            code: '6',
            description: 'Klinik Panel',
        },
    ];

    let roleOptions: DropdownDTO[] = LookupHelper.toDropdown(roleLookupList);

    // create form
    const form = await superValidate(_loginSchema);

    // set default usergroup
    form.data.userGroup = userGroupOptions[0].value;

    // set default role
    form.data.currentRole = roleOptions[0].value;

    return {
        props: {
            form,
            userGroupOptions,
            roleOptions,
            roleLookupList,
        },
    };
};

// on login form submit
export const _submit = async (formData: AuthenticationRequestDTO) => {
    const form = await superValidate(formData, _loginSchema);

    if (form.valid) {
        // post
        const response: CommonResponseDTO =
            await AuthService.authenticateUser(formData);

        if (response.status == 'success') {
        } else {
            localStorage.setItem(LocalStorageKeyConstant.userName, 'user01');
            localStorage.setItem(LocalStorageKeyConstant.accessToken, 'token');
            localStorage.setItem(
                LocalStorageKeyConstant.currentRole,
                'Kakitangan',
            );
            localStorage.setItem(LocalStorageKeyConstant.fullName, 'Jon Bovi');
        }
    } else {
        return fail(400, form);
    }
};
