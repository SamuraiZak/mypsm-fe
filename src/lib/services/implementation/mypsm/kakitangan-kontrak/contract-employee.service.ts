// ===============================================================
// Contract Employee Services
// ===============================================================

import { invalidateAll } from '$app/navigation';
import { CommonResponseConstant } from '$lib/constants/core/common-response.constant';
import {
    CommonListRequestConvert,
    type CommonListRequestDTO,
} from '$lib/dto/core/common/common-list-request.dto';
import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
import { AddNewContractEmployeeDTOConvert, type AddNewContractEmployeeDTO } from '$lib/dto/mypsm/kakitangan-kontrak/add-new-contract-employee.dto';
import { getPromiseToast } from '$lib/helpers/core/toast.helper';
import http from '$lib/services/implementation/service-provider.service';
import type { Input } from 'ky';

export class ContractEmployeeServices {

    // get contract employee list
    static async getContractEmployeeList(param: CommonListRequestDTO) {
        try {
            let url: Input = 'contracts/list';

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

    //add new contract employee
    static async addNewContractEmployee(param: AddNewContractEmployeeDTO) {
        try {
            let url: Input = 'contracts/add';

            const promiseRes: Promise<Response> = http
                .post(url, {
                    body: AddNewContractEmployeeDTOConvert.toJson(param),
                })
                .json();
                
            const response: Response = await getPromiseToast(promiseRes);
            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                invalidateAll()
                return result;
            } else {
                return CommonResponseConstant.httpError;
            }
        } catch (error) {
            return CommonResponseConstant.httpError;
        }
    }
}
