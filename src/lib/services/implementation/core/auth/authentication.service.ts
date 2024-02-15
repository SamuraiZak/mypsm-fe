// ===============================================================
// Authentication Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    AuthenticationRequestConvert,
    type AuthenticationRequestDTO,
} from '$lib/dto/core/auth/authentication-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class AuthService {
    // login
    static async authenticateUser(param: AuthenticationRequestDTO) {
        try {
            let url: Input = '';

            const response: Response = await http
                .post(url, {
                    body: AuthenticationRequestConvert.toJson(param),
                })
                .json();

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
