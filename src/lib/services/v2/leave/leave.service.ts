import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import { toasterCommon } from '$lib/helpers/core/french-toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class LeaveServices {
    static async addLeaveApplication(param: any) {
        try {
            let url: Input = 'leave/leave_application/add';
            const promiseResponse: Promise<Response> = http
                .post(url, {
                    body: JSON.stringify(param),
                })
                .json();
            const response = await toasterCommon(promiseResponse);
            const result = CommonResponseConvert.fromResponse(response);
            if (result.status == 'success') {
                await invalidateAll();
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
}
