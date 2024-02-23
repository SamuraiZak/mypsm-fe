// ===============================================================
// Employee Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import {
    EmployeeDetailRequestConvert,
    type EmployeeDetailRequestDTO,
} from '$lib/dto/core/common/employee/employee-detail-request.dto';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class EmployeeServices {
    static async getEmployeeList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'employee/list';

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

    static async getEmployeeDetail(param: EmployeeDetailRequestDTO) {
        try {
            let url: Input = 'employee/detail';

            const response: Response = await http
                .post(url, {
                    body: EmployeeDetailRequestConvert.toJson(param),
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
