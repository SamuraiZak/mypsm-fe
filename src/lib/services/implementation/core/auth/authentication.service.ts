// ===============================================================
// Authentication Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    AuthenticationRequestConvert,
    type AuthenticationRequestDTO,
} from '$lib/dto/core/authentication/authentication-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { Input } from 'ky';
import http from '../../service-provider.service';
import { AuthenticationHelper } from '$lib/helpers/core/authentication.helper';

export class AuthService {
    // login
    static async authenticateUser(param: object) {
        try {
            let url: Input = 'auth/login';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();

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
}
