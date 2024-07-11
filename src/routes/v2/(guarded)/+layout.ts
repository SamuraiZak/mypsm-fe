import { goto, invalidateAll } from '$app/navigation';
import { SystemConstant } from '$lib/constants/core/system/system.constant';
import type { AuthenticationResponseDTO } from '$lib/dto/core/authentication/authentication-response.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { ModuleDTO } from '$lib/dto/core/system/system.dto';
import type {
    AccountDetailsDTO,
    SwitchRoleDTO,
} from '$lib/dto/core/user-account/user-account.dto';
import { AuthenticationHelper } from '$lib/helpers/core/authentication.helper';
import { getErrorToast } from '$lib/helpers/core/toast.helper';
import { SystemServices } from '$lib/services/implementation/core/system/system.service';
import { AccountServices } from '$lib/services/implementation/core/user-account/user-account.service';
import { fail } from '@sveltejs/kit';

export async function load() {
    let modules: ModuleDTO[] = SystemConstant.systemModules;

    let accountDetails: AccountDetailsDTO = {
        name: 'Jon Bovi',
        currentRole: 'kakitangan',
        currentRoleCode: '30f9b9da-429d-4965-b1fd-734843c1ed28',
        roles: [
            {
                id: '21',
                name: 'kakitangan',
                code: '30f9b9da-429d-4965-b1fd-734843c1ed28',
            },
        ],
        module: SystemConstant.systemModules,
        passwordExpired: false,
    };

    const accountDetailResponse: CommonResponseDTO =
        await SystemServices.getAccountDetails();

    if (accountDetailResponse.status == 'success') {
        accountDetails = accountDetailResponse.data
            ?.details as AccountDetailsDTO;
    }

    // console.log(accountDetails);
    // console.log(accountDetailResponse);

    return {
        props: {
            modules,
            accountDetails,
        },
        layoutData: {
            modules,
            accountDetails,
        },
    };
}

export const _switchRole = async (params: SwitchRoleDTO) => {
    const response: CommonResponseDTO =
        await AccountServices.switchRole(params);

    if (response.status == 'success') {
        const isStored: boolean = await AuthenticationHelper.storeAccessToken(
            response.data?.details as AuthenticationResponseDTO,
        );

        if (isStored) {
            await invalidateAll();
            goto('/v2/dashboard');
        } else {
            await getErrorToast();
        }
    } else {
        await getErrorToast();
    }
};
