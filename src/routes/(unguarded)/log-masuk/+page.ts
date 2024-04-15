import { goto } from '$app/navigation';
import { UserGroupConstant } from '$lib/constants/core/user-group.constant';
import type { ResetPasswordDTO } from '$lib/dto/core/account/reset-password.dto';
import type { AuthenticationRequestDTO } from '$lib/dto/core/authentication/authentication-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import {
    UserGroupConvert,
    type UserGroupDTO,
} from '$lib/dto/core/user-group/user-group.dto';
import {
    UserRoleConvert,
    type UserRoleDTO,
} from '$lib/dto/core/user-role/user-role.dto';
import {
    LoginClinicSchema,
    LoginCommonSchema,
} from '$lib/schemas/core/login.schema';
import { AccountServices } from '$lib/services/implementation/core/account/account.service';
import { AuthService } from '$lib/services/implementation/core/auth/authentication.service';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { ForgotPasswordSchema } from '../../../lib/schemas/core/login.schema';
import { _forgotPasswordSchema } from '../login/forgot-password/+page';

export async function load() {
    // get list of user role
    let dropdownRole: DropdownDTO[] = [];

    let roleList: UserRoleDTO[] = [];

    let roleResponse: CommonResponseDTO = await LookupServices.getRoleEnums();

    if (roleResponse.status == 'success') {
        roleList = roleResponse.data?.dataList as UserRoleDTO[];
    }

    roleList = roleList
        .slice()
        .sort((a, b) => a.description.localeCompare(b.description));

    dropdownRole = UserRoleConvert.toDropdown(roleList);

    // get list of user group
    let dropdownGroup: DropdownDTO[] = [];

    const groupList: UserGroupDTO[] = UserGroupConstant.list;

    dropdownGroup = UserGroupConvert.toDropdown(groupList);

    // create login form
    const loginCommonForm = await superValidate(zod(LoginCommonSchema));

    loginCommonForm.data.userGroupCode = UserGroupConstant.employee.code;

    const loginClinicForm = await superValidate(zod(LoginClinicSchema));

    loginClinicForm.data.userGroupCode = UserGroupConstant.clinic.code;

    // create forgot password
    const forgotPasswordForm = await superValidate(zod(_forgotPasswordSchema));

    return {
        props: {
            dropdownRole,
            roleList,
            dropdownGroup,
            groupList,
        },
        forms: {
            loginCommonForm,
            loginClinicForm,
            forgotPasswordForm,
        },
    };
}

export const _submitLoginForm = async (formData: AuthenticationRequestDTO) => {
    const form = await superValidate(formData, zod(LoginCommonSchema));

    if (form.valid) {
        const loginSuccess: boolean = await AuthService.login(formData);

        setTimeout(() => {
            if (loginSuccess) {
                goto('/halaman-utama');
            }
        }, 2000);
    } else {
        return fail(400, form);
    }
};

export const _submitLoginClinicForm = async (formData: AuthenticationRequestDTO) => {
    const form = await superValidate(formData, zod(LoginClinicSchema));

    if (form.valid) {
        const loginSuccess: boolean = await AuthService.login(formData);

        setTimeout(() => {
            if (loginSuccess) {
                goto('/halaman-utama');
            }
        }, 2000);
    } else {
        return fail(400, form);
    }
};

export const _submitForgotPassword = async (formData: ResetPasswordDTO) => {
    const form = await superValidate(formData, zod(ForgotPasswordSchema));

    let requestSuccess: boolean | null = null;

    if (form.valid) {
        const response: CommonResponseDTO =
            await AuthService.resetPassword(formData);

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
