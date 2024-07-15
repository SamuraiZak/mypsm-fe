// ===============================================================
// Account Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    ResetPasswordConvert,
    type ResetPasswordDTO,
} from '$lib/dto/core/account/reset-password.dto';
import {
    UpdatePasswordRequestConvert,
    type UpdatePasswordRequestDTO,
} from '$lib/dto/core/account/update-password.dto';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import {
    CommonResponseConvert,
    type CommonResponseDTO,
} from '$lib/dto/core/common/common-response.dto';
import type { AccountDetailsRequestDTO } from '$lib/dto/core/user-account/user-account.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class AccountServices {
    // get account details
    static async getAccountDetails() {
        try {
            let url: Input = 'account/current_detail';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // update password service
    static async getTargetEmployeesDetail(param: AccountDetailsRequestDTO) {
        try {
            let url: Input = 'account/current_detail';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                let errorResult: CommonResponseConstant = {
                    status: 'error',
                    message: result.message,
                    data: {
                        details: {},
                        dataList: [],
                    },
                };
                return errorResult;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // update password service
    static async updatePassword(param: UpdatePasswordRequestDTO) {
        try {
            let url: Input = 'account/update_password';

            const response: Response = await http
                .post(url, {
                    body: UpdatePasswordRequestConvert.toJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                return result;
            } else {
                let errorResult: CommonResponseConstant = {
                    status: 'error',
                    message: result.message,
                    data: {
                        details: {},
                        dataList: [],
                    },
                };
                return errorResult;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    static async forgotPassword(param: ResetPasswordDTO) {
        try {
            let url: Input = 'auth/reset_password';

            const responsePromise: Promise<Response> = http
                .post(url, {
                    body: ResetPasswordConvert.toJson(param),
                })
                .json();

            const response = await getPromiseToast(responsePromise);

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
