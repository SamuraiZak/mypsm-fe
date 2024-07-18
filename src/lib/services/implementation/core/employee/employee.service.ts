import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonResponseConvert,
    type CommonResponseDTO,
} from '$lib/dto/core/common/common-response.dto';
import type { Input } from 'ky';
import http from '../../service-provider.service';

export class EmployeeExtendedServices {
    static async getCurrentEmployeeDetails() {
        try {
            const url: Input = 'employee/current_detail';

            const response: Response = await http.get(url, {}).json();

            const result: CommonResponseDTO =
                CommonResponseConvert.fromResponse(response);

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
