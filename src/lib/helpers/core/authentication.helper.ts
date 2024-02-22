// ===============================================================
// Authentication Helper
// ===============================================================

import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import type { AccountDetailDTO } from '$lib/dto/core/account/account-details.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { AccountServices } from '$lib/services/implementation/core/account/account.service';
import { TextAppearanceHelper } from './text-appearance.helper';

export class AuthenticationHelper {
    static saveToken(token: string) {
        localStorage.setItem(LocalStorageKeyConstant.accessToken, token);
    }

    static loginSuccess() {
        try {
            const getAccountDetails: CommonResponseDTO =
                AccountServices.getAccountDetails() as CommonResponseDTO;

            if (getAccountDetails.status == 'success') {
                const accountDetails: AccountDetailDTO =
                    getAccountDetails.data?.details;

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
            } else {
            }
        } catch (error) {}
    }
}
