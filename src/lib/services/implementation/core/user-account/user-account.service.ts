import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import type { AccountPasswordResetDTO } from '$lib/schemas/core/user-account.schema';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class AccountServices {
    // forgot password
    static async resetPassword(param: AccountPasswordResetDTO) {
        try {
            let url: Input = '';

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
