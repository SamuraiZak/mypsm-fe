// ===============================================================
// Service Allowance Services
// ===============================================================

import { CommonResponseConstant } from "$lib/constants/core/common-response.constant";
import { type CommonListRequestDTO, CommonListRequestConvert } from "$lib/dto/core/common/common-list-request.dto";
import { CommonResponseConvert } from "$lib/dto/core/common/common-response.dto";
import type { Input } from "ky";
import http from "$lib/services/implementation/service-provider.service";

export class ServiceAllowanceServices {

    // POST: get list of allowance
    static async method(param: CommonListRequestDTO) {
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