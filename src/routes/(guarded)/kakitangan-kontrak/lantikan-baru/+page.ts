import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonFilterDTO } from "$lib/dto/core/common/common-filter.dto";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ContractEmployeeListDTO } from "$lib/dto/mypsm/kakitangan-kontrak/contract-employee-list.dto";
import type { GetContractEmployeeOffer } from "$lib/dto/mypsm/kakitangan-kontrak/get-contract-employee-offer.dto";
import { ContractEmployeeServices } from "$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service";

export const load = async () => {
    const currentRoleCode: string | null = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let contractEmployeeListResponse: CommonResponseDTO = {}
    let contractEmployeeList: ContractEmployeeListDTO[] = [];
    let employeeContractOffer: GetContractEmployeeOffer[] = [];
    const contractEmployeeListParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "candidateId",
        orderType: 1,
        filter: {},
    }
    // table 
    if (currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code) {
        contractEmployeeListResponse =
            await ContractEmployeeServices.getContractEmployeeList(contractEmployeeListParam);
        if (contractEmployeeListResponse.status == "success") {
            contractEmployeeList = contractEmployeeListResponse.data?.dataList as ContractEmployeeListDTO[];
        }
    } else if (currentRoleCode === UserRoleConstant.penyokong.code) {
        contractEmployeeListResponse =
            await ContractEmployeeServices.getContractSupporterTable(contractEmployeeListParam);
        if (contractEmployeeListResponse.status == "success") {
            contractEmployeeList = contractEmployeeListResponse.data?.dataList as ContractEmployeeListDTO[];
        }
    } else if (currentRoleCode === UserRoleConstant.pelulus.code) {
        contractEmployeeListResponse =
            await ContractEmployeeServices.getContractApproverTable(contractEmployeeListParam);
        if (contractEmployeeListResponse.status == "success") {
            contractEmployeeList = contractEmployeeListResponse.data?.dataList as ContractEmployeeListDTO[];
        }
    }   else if (currentRoleCode === UserRoleConstant.calonKontrak.code) {
        contractEmployeeListResponse =
            await ContractEmployeeServices.getContractEmployeeOfferList();
        if (contractEmployeeListResponse.status == "success") {
            employeeContractOffer = contractEmployeeListResponse.data?.dataList as GetContractEmployeeOffer[];
        }
    }

    return {
        currentRoleCode,
        contractEmployeeListParam,
        contractEmployeeListResponse,
        contractEmployeeList,
        employeeContractOffer,
    }
}

export async function _updateContractEmployeeListTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO =
        await ContractEmployeeServices.getContractEmployeeList(param);

    return {
        param,
        response,
    };
}