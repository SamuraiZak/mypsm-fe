import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import { toasterCommon } from '$lib/helpers/core/french-toast.helper';
import type { AccountPasswordResetDTO } from '$lib/schemas/core/user-account.schema';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class AccountServices {
    static async resetPassword(param: AccountPasswordResetDTO) {
        try {
            let url: Input = 'url';
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
}
