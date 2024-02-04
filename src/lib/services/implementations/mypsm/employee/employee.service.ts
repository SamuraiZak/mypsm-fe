import { CommonResponseConstant } from '$lib/constants/core/common-response-constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import {
    CommonResponseConvert,
    type CommonResponseDTO,
} from '$lib/dto/core/common/common-response.dto';
import http from '$lib/services/provider/service-provider.service';
import type { Input } from 'ky';

export class EmployeeServices {
    static async getEmployeeList(param: CommonListRequestDTO) {
        try {
            // Change the url here
            let url: Input =
                'employments/force-transfer-by-management-choose-employees';

            const response: Response = await http
                .post(url, {
                    body: CommonListRequestConvert.toJson(param),
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
            // Add your code here

            // change the return variable accordingly
            return CommonResponseConstant.httpError;
        }
    }
}
