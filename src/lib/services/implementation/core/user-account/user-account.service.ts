import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { AccountDetailsRequestDTO, SwitchRoleDTO } from '$lib/dto/core/user-account/user-account.dto';
import {
    toasterCommon,
    toasterGetMethod,
    toasterSwitchRole,
} from '$lib/helpers/core/french-toast.helper';
import type {
    AccountPasswordResetDTO,
    AccountUpdatePasswordDTO,
} from '$lib/schemas/core/user-account.schema';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class AccountServices {
    static async resetPassword(param: AccountPasswordResetDTO) {
        try {
            let url: Input = 'auth/reset_password';
            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();
            const response = await toasterCommon(promiseResponse);
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

    static async updatePassword(param: AccountUpdatePasswordDTO) {
        try {
            let url: Input = 'account/update_password';
            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();
            const response = await toasterCommon(promiseResponse);
            const result = CommonResponseConvert.fromResponse(response);
            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    // get current user details
    static async getAccountDetails() {
        try {
            let url: Input = 'auth/detail';
            const response: Response = await http.get(url, {}).json();
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

    // update password service
    static async getTargetEmployeesDetail(param: AccountDetailsRequestDTO) {
        try {
            let url: Input = 'auth/detail';

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

    static async switchRole(param: SwitchRoleDTO) {
        try {
            let url: Input = 'auth/switch';
            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();
            const response = await toasterSwitchRole(promiseResponse);
            const result = CommonResponseConvert.fromResponse(response);
            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }

    static async getNotification() {
       try {
          let url: Input = 'account/notification';
          const response: Response = await http.get(url, {}).json();
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
