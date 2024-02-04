// ===============================================================
// Authentication Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response-constant';
import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key-constant';
import type { AccountDTO } from '$lib/dto/core/auth/account-fullname.dto';
import {
    AuthRequestConvert,
    type AuthRequestDTO,
} from '$lib/dto/core/auth/auth-request.dto';
import type { AuthResponseDTO } from '$lib/dto/core/auth/auth-response.dto';
import {
    PwdUpdateRequestConvert,
    type PwdUpdateRequestDTO,
} from '$lib/dto/core/auth/update-password-request.dto';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import {
    CommonResponseConvert,
    type CommonResponseDTO,
} from '$lib/dto/core/common/common-response.dto';
import { AuthenticationHelper } from '$lib/helper/core/authentication-helper/authentication-helper';
import http from '$lib/services/provider/service-provider.service';
import currentRole from '$lib/stores/activeRole';
import type { AuthenticationRequestViewModel } from '$lib/view-models/core/auth/auth-request.view-model';
import { AuthenticationResponseConvert } from '$lib/view-models/core/auth/auth-response.view-model';
import { EnumRoleResponseConvert } from '$lib/view-models/core/lookup/role/role-enum-reponse.view-model';
import type { Input } from 'ky';

export class AuthService {
    // login service for employee
    static async loginEmployee(param: AuthenticationRequestViewModel) {
        const response: Response = await http
            .post('authentication/employee-login', {
                body: JSON.stringify(param),
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
            })
            .json();

        const loginResponse =
            AuthenticationResponseConvert.fromResponse(response);

        if (loginResponse.status === 200) {
            localStorage.setItem(
                LocalStorageKeyConstant.accessToken,
                loginResponse.data.token,
            );
        }

        return loginResponse;
    }

    // login service for candidate
    static async loginCandidate(param: AuthenticationRequestViewModel) {
        const response: Response = await http
            .post('authentication/candidate-login', {
                body: JSON.stringify(param),
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
            })
            .json();

        const loginResponse =
            AuthenticationResponseConvert.fromResponse(response);

        if (loginResponse.status === 200) {
            localStorage.setItem(
                LocalStorageKeyConstant.accessToken,
                loginResponse.data.token,
            );
        }

        return loginResponse;
    }

    // login service for panel clinic
    static async loginClinic(param: AuthenticationRequestViewModel) {
        const response: Response = await http
            .post('authentication/login-candidate', {
                body: JSON.stringify(param),
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
            })
            .json();

        const loginResponse =
            AuthenticationResponseConvert.fromResponse(response);

        localStorage.setItem(
            LocalStorageKeyConstant.accessToken,
            loginResponse.data.token,
        );

        return loginResponse;
    }

    // get all roles available
    static async getRoleOptions() {
        const response: Response = await http.get('lookups/roles').json();
        return EnumRoleResponseConvert.fromResponse(response);
    }
    // get all roles available
    static async logout() {
        AuthenticationHelper.clearLocalStorage();
    }

    // authentication service for all types of user
    static async authenticateUser(param: AuthRequestDTO) {
        try {
            let url: Input = '';

            switch (param.userGroup) {
                case 'employee':
                    url = 'authentication/employee-login';
                    break;

                case 'candidate':
                    url = 'authentication/candidate-login';
                    break;

                case 'clinic':
                    url = 'authentication/clinic-login';
                    break;

                default:
                    url = 'authentication/employee-login';
                    break;
            }

            const httpResponse: Response = await http.post(url, {
                body: AuthRequestConvert.toJson(param),
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
            });

            const response = await httpResponse.json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                const authResponse: AuthResponseDTO = result.data
                    ?.details as AuthResponseDTO;

                localStorage.setItem(
                    LocalStorageKeyConstant.accessToken,
                    authResponse.token,
                );

                localStorage.setItem(
                    LocalStorageKeyConstant.userName,
                    param.username,
                );

                localStorage.setItem(
                    LocalStorageKeyConstant.currentRole,
                    param.currentRole,
                );

                currentRole.set(param.currentRole);
            }
            return result;
        } catch (error) {
            const result: CommonResponseDTO = {
                status: 'error',
            };

            return result;
        }
    }

    static async getFullName() {
        try {
            // Change the url here
            let url: Input = 'personal-details/get-user-name';

            const response: Response = await http
                .get(url)
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                let account: AccountDTO = result.data?.details;
                // Add your code here
                localStorage.setItem(
                    LocalStorageKeyConstant.fullName,
                    account.name,
                );
                // change the return variable accordingly
                return result;
            } else {
                // Add your code here
                localStorage.setItem(
                    LocalStorageKeyConstant.fullName,
                    'failed to retrieve data',
                );
                // change the return variable accordingly
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            // const result: CommonResponseDTO = {
            //     status: 'error',
            // };
            // Add your code here

            // change the return variable accordingly
            localStorage.setItem(
                LocalStorageKeyConstant.fullName,
                'failed to retrieve data',
            );
            return CommonResponseConstant.httpError;
        }
    }

    // update password service
    static async updatePassword(param: PwdUpdateRequestDTO) {
        try {
            let url: Input = 'authentication/update-password';

            const httpResponse: Response = await http.post(url, {
                body: PwdUpdateRequestConvert.toJson(param),
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
            });

            const response = await httpResponse.json();

            const result = CommonResponseConvert.fromResponse(response);

            return result;
        } catch (error) {
            const result: CommonResponseDTO = {
                status: 'error',
            };
            return result;
        }
    }
}
