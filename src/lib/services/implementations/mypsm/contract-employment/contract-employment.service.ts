import { CommonResponseConstant } from "$lib/constants/core/common-response-constant";
import { CommonListRequestConvert, type CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import { CommonResponseConvert, type CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import { AddNewContractRequestConvert, type AddNewContractRequest } from "$lib/dto/mypsm/contract-employment/add-new-contract-request.dto";
import type { AddNewContractResponse } from "$lib/dto/mypsm/contract-employment/add-new-contract-response.dto";
import http from "$lib/services/provider/service-provider.service";
import type { Input } from "ky";

export class ContractEmploymentServices {
    // create new contract employment
    static async addNewContract(param: AddNewContractRequest) {
       
        try {
            // Change the url here
            const url: Input = 'contracts/add-new-contract';

            const response: Response = await http
                .post(url, {
                    body: AddNewContractRequestConvert.toJson(param),
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

    // static async getSalaryMovementDetail(
    //     param: DetailSalaryMovementRequestDTO,
    // ) {
    //     const response: Response = await http
    //         .post('salaries/get-salary-movement', {
    //             body: DetailSalaryMovementRequestDTOConvert.toJson(param),
    //         })
    //         .json();
    //     return CommonResponseConvert.fromResponse(response);
    // }

    //add salary movement
    // static async addSalaryMovement(param: AddSalaryMovementRequestDTO) {
    //     const response: CommonResponseDTO = await http
    //         .post('salaries/add-salary-movement', {
    //             body: JSON.stringify(param),
    //         })
    //         .json();

    //     if (response.status! === 'success') {
    //         return response;
    //     } else {
    //         throw new Error('Unknown error');
    //     }
    // }
}