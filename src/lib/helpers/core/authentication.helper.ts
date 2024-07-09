// ===============================================================
// Authentication Helper
// ===============================================================

import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import type { AccountDetailDTO } from '$lib/dto/core/account/account-details.dto';
import {
    AuthenticationRequestConvert,
    type AuthenticationRequestDTO,
} from '$lib/dto/core/authentication/authentication-request.dto';
import type { AuthenticationResponseDTO } from '$lib/dto/core/authentication/authentication.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import { AccountServices } from '$lib/services/implementation/core/account/account.service';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';
import { TextAppearanceHelper } from './text-appearance.helper';

export class AuthenticationHelper {
    // deprecated
    static saveToken(token: string) {
        localStorage.setItem(LocalStorageKeyConstant.accessToken, token);
    }

    // deprecated
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

    // deprecated
    static async saveAccountDetails(param: AccountDetailDTO) {
        try {
            // save the full name
            localStorage.setItem(
                LocalStorageKeyConstant.fullName,
                param.fullName,
            );

            // save the full name
            localStorage.setItem(LocalStorageKeyConstant.email, param.email);

            // save the full name
            localStorage.setItem(
                LocalStorageKeyConstant.currentRole,
                param.currentRole.description,
            );

            // save the full name
            localStorage.setItem(
                LocalStorageKeyConstant.currentRoleCode,
                param.currentRole.code,
            );

            return true;
        } catch (error) {
            return false;
        }
    }

    static async storeAccessToken(params: AuthenticationResponseDTO) {
        try {
            localStorage.setItem(
                LocalStorageKeyConstant.accessToken,
                params.token,
            );

            return true;
        } catch (error) {
            return false;
        }
    }
}
