import { CommonResponseConstant } from '$lib/constants/core/common-response-constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import {
    CommonResponseConvert,
    type CommonResponseDTO,
} from '$lib/dto/core/common/common-response.dto';
import {
    AddAPCRequestConvert,
    type AddAPCRequestDTO,
} from '$lib/dto/mypsm/lnpt/apc/add-apc-request.dto';
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

    static async addAPCRecord(param: AddAPCRequestDTO) {
        try {
            // Change the url here
            let url: Input = 'performance/add-performance-history-apc';

            const response: Response = await http
                .post(url, {
                    body: AddAPCRequestConvert.addAPCRequestDTOToJson(param),
                })
                .json();

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                // Add your code here

                // change the return variable accordingly
                return result;
            } else {
                // Add your code here

                // change the return variable accordingly
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
}
