// ===============================================================
// Service Allowance Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import {
    ServAllTambangDetailConvert,
    type ServAllTambangDetailDTO,
} from '$lib/dto/mypsm/elaun-elaun-perkhidmatan/tambang/elaun-tambang-add.dto';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class ServiceAllowanceServices {
    // POST: get list of allowance
    static async getAllowanceList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'service_allowance/list';

            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
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

    static async submitAllowanceDetailTambang(param: ServAllTambangDetailDTO) {
        try {
            let url: Input = 'service_allowance/state_visit/add';

            const response: Response = await http
                .post(url, {
                    body: ServAllTambangDetailConvert.toJson(param),
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
