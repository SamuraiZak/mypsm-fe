// ===============================================================
// Account Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert, type CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class AccountServices {
    // get account details
    static async getAccountDetails() {
        try {
            let url: Input = 'account/current_detail';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO = CommonResponseConvert.fromResponse(response);

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
