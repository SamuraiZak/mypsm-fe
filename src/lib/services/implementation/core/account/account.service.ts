// ===============================================================
// Account Services
// ===============================================================


import type { Input } from 'ky';
import http from '../../service-provider.service';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';

export class AccountServices {

    // update password service
    static async updatePassword(param: object) {
        try {
            let url: Input = 'account/updatePassword';

            const response: Response = await http
                .post(url, {
                    body: JSON.stringify(param),
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
