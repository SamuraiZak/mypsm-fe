import { CommonResponseConstant } from '$lib/constants/core/common-response-constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import {
    CommonResponseConvert,
    type CommonResponseDTO,
} from '$lib/dto/core/common/common-response.dto';
import type { ApcEmployeeDTO } from '$lib/dto/mypsm/lnpt/apc/apc-employee.dto';
import http from '$lib/services/provider/service-provider.service';
import type { Input } from 'ky';

export class LNPTServices {
    static async getAPCHistory(param: CommonListRequestDTO) {
        try {
            // Change the url here
            let url: Input = 'performance/performance-histories';

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
