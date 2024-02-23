import { goto } from '$app/navigation';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { RoleConstant } from '$lib/constants/core/role.constant';
import { UserGroupConstant } from '$lib/constants/core/user-group.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { AccountDetailDTO } from '$lib/dto/core/account/account-details.dto';
import type { AuthenticationRequestDTO } from '$lib/dto/core/authentication/authentication-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
import {
    UserGroupConvert,
    type UserGroupDTO,
} from '$lib/dto/core/user-group/user-group.dto';
import {
    UserRoleConvert,
    type UserRoleDTO,
} from '$lib/dto/core/user-role/user-role.dto';
import { AuthenticationHelper } from '$lib/helpers/core/authentication.helper';
import { LookupHelper } from '$lib/helpers/core/lookup.helper';
import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';
import { AccountServices } from '$lib/services/implementation/core/account/account.service';
import { AuthService } from '$lib/services/implementation/core/auth/authentication.service';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/client';
import { Schema, z } from 'zod';

export const _loginSchema = z
    .object({
        userGroupCode: z.string(),
        currentRoleCode: z.string(),
        username: z.coerce.string().trim(),
        password: z.string().trim().min(5, {
            message: 'Ruangan ini harus diisi tidak kurang dari 5 aksara',
        }),
    })
    .superRefine(({ userGroupCode, username }, ctx) => {
        if (
            userGroupCode !== UserGroupConstant.clinic.code &&
            username.length !== 12
        ) {
            ctx.addIssue({
                code: 'custom',
                message: 'No. Kad Pengenalan tidak sah',
                path: ['username'],
            });
        }

        if (
            userGroupCode === UserGroupConstant.clinic.code &&
            username.length < 5
        ) {
            ctx.addIssue({
                code: 'custom',
                message: 'ID hendaklah diisi lebih dari 5 aksara',
                path: ['username'],
            });
        }
    });

// on page load
export const load = async () => {
    // user group constants
    const groupList: UserGroupDTO[] = UserGroupConstant.list;

    // user group dropdown
    const groupDropdown: DropdownDTO[] = UserGroupConvert.toDropdown(groupList);

    // user role constants
    const roleList: UserRoleDTO[] = UserRoleConstant.list;

    // transform role list to dropdown
    let roleDropdown: DropdownDTO[] = UserRoleConvert.toDropdown(roleList).sort(
        (a, b) => (a.name < b.name ? -1 : 1),
    );

    // create form
    const form = await superValidate(_loginSchema);

    // set default usergroup
    form.data.userGroupCode = UserGroupConstant.employee.code;

    // set default role
    form.data.currentRoleCode = UserRoleConstant.kakitangan.code;

    return {
        props: {
            form,
            groupDropdown,
            roleList,
            roleDropdown,
        },
    };
};

// on login form submit
export const _submit = async (formData: AuthenticationRequestDTO) => {
    const form = await superValidate(formData, _loginSchema);

    if (form.valid) {
        const response: CommonResponseDTO =
            await AuthService.authenticateUser(formData);

        // if login successful
        if (response.status == 'success') {
            if (formData.userGroupCode == UserGroupConstant.candidate.code) {
                localStorage.setItem(
                    LocalStorageKeyConstant.fullName,
                    'Tiada maklumat',
                );

                localStorage.setItem(
                    LocalStorageKeyConstant.currentRoleCode,
                    UserRoleConstant.calon.code,
                );

                localStorage.setItem(
                    LocalStorageKeyConstant.currentRole,
                    TextAppearanceHelper.toCamelCase(
                        UserRoleConstant.calon.code,
                    ),
                );
                goto('/halaman-utama');
            } else {
                // get account details
                const accountDetailsResponse: CommonResponseDTO =
                    (await AccountServices.getAccountDetails()) as CommonResponseDTO;

                // if get account details successful
                if (accountDetailsResponse.status == 'success') {
                    const accountDetails: AccountDetailDTO =
                        accountDetailsResponse.data
                            ?.details as AccountDetailDTO;

                    localStorage.setItem(
                        LocalStorageKeyConstant.fullName,
                        accountDetails.fullName,
                    );

                    localStorage.setItem(
                        LocalStorageKeyConstant.currentRoleCode,
                        accountDetails.currentRole.code,
                    );

                    localStorage.setItem(
                        LocalStorageKeyConstant.currentRole,
                        TextAppearanceHelper.toCamelCase(
                            accountDetails.currentRole.description,
                        ),
                    );
                    goto('/halaman-utama');
                } else {
                }
            }
        } else {
        }

        // if (response.status == 'success') {
        //     const getAccountDetails: CommonResponseDTO =
        //         AccountServices.getAccountDetails() as CommonResponseDTO;

        //     const accountDetails: AccountDetailDTO =
        //         getAccountDetails.data?.details;

        //     // localStorage.setItem(
        //     //     LocalStorageKeyConstant.fullName,
        //     //     accountDetails.fullName,
        //     // );

        //     localStorage.setItem(
        //         LocalStorageKeyConstant.currentRoleCode,
        //         accountDetails.currentRole.code,
        //     );

        //     localStorage.setItem(
        //         LocalStorageKeyConstant.currentRole,
        //         TextAppearanceHelper.toCamelCase(
        //             accountDetails.currentRole.description,
        //         ),
        //     );
        //     goto('/halaman-utama');
        // } else {
        // }
    } else {
        return fail(400, form);
    }
};
