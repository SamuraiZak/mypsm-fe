import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { NewContractDetailResponse } from "$lib/dto/mypsm/contract-employment/detail-new-contract-response.dto";
import { ContractEmploymentServices } from "$lib/services/implementations/mypsm/contract-employment/contract-employment.service";



export async function load (){
    const response: CommonResponseDTO =
        await ContractEmploymentServices.getContractInfoForCandidate()
    const contractList: NewContractDetailResponse =
        response.data?.details as NewContractDetailResponse;

        return {
            contractList,
        }
}