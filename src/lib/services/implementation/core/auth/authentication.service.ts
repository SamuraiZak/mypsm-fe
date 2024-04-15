// ===============================================================
// Authentication Services
// ===============================================================

import { goto, invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import type { AccountDetailDTO } from '$lib/dto/core/account/account-details.dto';
import {
    ResetPasswordConvert,
    type ResetPasswordDTO,
} from '$lib/dto/core/account/reset-password.dto';
import {
    AuthenticationRequestConvert,
    type AuthenticationRequestDTO,
} from '$lib/dto/core/authentication/authentication-request.dto';
import type { AuthenticationResponseDTO } from '$lib/dto/core/authentication/authentication-response.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import { AuthenticationHelper } from '$lib/helpers/core/authentication.helper';
import {
    getLoadingToast,
    getLoginToast,
    getResetPasswordToast,
} from '$lib/helpers/core/toast.helper';
import { TokenHelper } from '$lib/helpers/core/token.helper';
import { error } from '@sveltejs/kit';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class AuthService {
    // login
    static async authenticateUser(param: AuthenticationRequestDTO) {
        try {
            let url: Input = 'auth/login';

            const response: Response = await http
                .post(url, {
                    body: AuthenticationRequestConvert.toJson(param),
                })
                .json();

            console.log(response);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                AuthenticationHelper.saveToken(result.data?.details.token);
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // complete login process
    static async loginProcess(param: AuthenticationRequestDTO) {
        // use try catch for safety
        try {
            // set the request url
            const url: Input = 'auth/login';

            // send login request
            const loginResponse: Response = await http
                .post(url, {
                    body: AuthenticationRequestConvert.toJson(param),
                })
                .json();

            // get the result as common response
            const loginResult =
                CommonResponseConvert.fromResponse(loginResponse);

            // handle the login result
            if (loginResult.status == 'success') {
                // if login success

                // get the token as auth response
                const authResponse: AuthenticationResponseDTO = loginResult.data
                    ?.details as AuthenticationResponseDTO;

                // call helper to save token
                const isTokenSaved: boolean = await TokenHelper.saveToken(
                    authResponse.token,
                );

                // check if token is saved
                if (isTokenSaved) {
                    // if token successfully saved

                    // get account details
                    const accountDetailsUrl: Input = 'account/current_detail';

                    // fetch
                    const accountResponse: Response = await http
                        .get(accountDetailsUrl)
                        .json();

                    // get the account detail result as common response
                    const accountDetailsResult =
                        CommonResponseConvert.fromResponse(accountResponse);

                    if (accountDetailsResult.status == 'success') {
                        // if account details retireved success
                        const accountDetails: AccountDetailDTO =
                            accountDetailsResult.data
                                ?.details as AccountDetailDTO;

                        // save account details in local storage
                        const isAccountDetailsSaved =
                            await AuthenticationHelper.saveAccountDetails(
                                accountDetails,
                            );

                        // check if the account details is saved
                        if (isAccountDetailsSaved) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                // if login fail or error
                return false;
            }
        } catch (error) {
            throw new Error('Something went wrong');
        }
    }

    static async login(param: AuthenticationRequestDTO) {
        // use try catch for safety
        try {
            // set the request url
            const url: Input = 'auth/login';

            // send login request
            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: AuthenticationRequestConvert.toJson(param),
                })
                .json();

            const response = await getLoginToast(promiseResponse);

            // get the result as common response
            const loginResult = CommonResponseConvert.fromResponse(response);

            // handle the login result
            if (loginResult.status == 'success') {
                // if login success

                // get the token as auth response
                const authResponse: AuthenticationResponseDTO = loginResult.data
                    ?.details as AuthenticationResponseDTO;

                // call helper to save token
                const isTokenSaved: boolean = await TokenHelper.saveToken(
                    authResponse.token,
                );

                // check if token is saved
                if (isTokenSaved) {
                    // if token successfully saved

                    // get account details
                    const accountDetailsUrl: Input = 'account/current_detail';

                    // fetch
                    const accountResponse: Response = await http
                        .get(accountDetailsUrl)
                        .json();

                    // get the account detail result as common response
                    const accountDetailsResult =
                        CommonResponseConvert.fromResponse(accountResponse);

                    if (accountDetailsResult.status == 'success') {
                        // if account details retireved success
                        const accountDetails: AccountDetailDTO =
                            accountDetailsResult.data
                                ?.details as AccountDetailDTO;

                        // save account details in local storage
                        const isAccountDetailsSaved =
                            await AuthenticationHelper.saveAccountDetails(
                                accountDetails,
                            );

                        // check if the account details is saved
                        if (isAccountDetailsSaved) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                // if login fail or error
                return false;
            }
        } catch (error) {
            throw new Error('Something went wrong');
        }
    }

    static async logout() {
        try {
            localStorage.clear;

            return true;
        } catch (error) {
            return false;
        }
    }

    static async resetPassword(param: ResetPasswordDTO) {
        try {
            let url: Input = 'auth/reset_password';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: ResetPasswordConvert.toJson(param),
                })
                .json();

            const response = await getResetPasswordToast(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
}
