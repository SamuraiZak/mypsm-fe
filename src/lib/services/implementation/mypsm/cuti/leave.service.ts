// ===============================================================
// Leave Services
// ===============================================================

import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import {
    LeaveEntitlementRequestConvert,
    type LeaveEntitlementRequestDTO,
} from '$lib/dto/mypsm/cuti/report/leave-entitlement-request.dto';
import {
    LeaveEntitlementConvert,
    type LeaveEntitlementDTO,
} from '$lib/dto/mypsm/cuti/report/leave-entitlement.dto';
import {
    LeaveHistoryRequestConvert,
    type LeaveHistoryRequestDTO,
} from '$lib/dto/mypsm/cuti/report/leave-history-request.dto';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class LeaveServices {
    // get leave entitlement
    static async getLeaveEntitlement(param: CommonListRequestDTO) {
        try {
            let url: Input = 'leave/report/entitlement';

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

    // get leave history
    static async getLeaveHistory(param: CommonListRequestDTO) {
        try {
            let url: Input = 'leave/report/history';

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

    // POST : get leave application list
    static async getLeaveApplicationList(param: CommonListRequestDTO) {
        try {
            let url: Input = '';

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
}
