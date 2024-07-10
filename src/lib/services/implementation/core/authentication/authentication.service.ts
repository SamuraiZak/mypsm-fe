import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import { CommonListRequestConvert } from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import {
    toasterCommon,
    toasterGetMethod,
    toasterLogin,
} from '$lib/helpers/core/french-toast.helper';
import type { AuthenticationRequestDTO } from '$lib/schemas/core/authentication.schema';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class AuthenticationServices {
    // authenticate user
    static async authenticate(param: AuthenticationRequestDTO) {
        try {
            let url: Input = 'auth/login';

            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

            const response = await toasterLogin(promiseResponse);

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

    // get current account details
    static async getAccountDetails() {
        try {
            let url: Input = 'auth/detail';
            const promiseResponse: Promise<Response> = http.get(url, {}).json();
            const response = await toasterGetMethod(promiseResponse);
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
