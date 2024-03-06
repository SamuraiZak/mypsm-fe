import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonFilterDTO } from "$lib/dto/core/common/common-filter.dto";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { ContractEmployeeListDTO } from "$lib/dto/mypsm/kakitangan-kontrak/contract-employee-list.dto";
import { ContractEmployeeServices } from "$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service";

export const load = async () => {
    const currentRoleCode: string | null = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)

    const contractEmployeeListFilter: ContractEmployeeListDTO = {
        candidateName: null,
        identityCardNo: null,
        temporaryId: null,
    }
    const contractEmployeeListParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: 1,
        filter: contractEmployeeListFilter,
    }

    const contractEmployeeListResponse: CommonResponseDTO =
        await ContractEmployeeServices.getContractEmployeeList(contractEmployeeListParam);

    let contractEmployeeList: ContractEmployeeListDTO[] = [];

    if (contractEmployeeListResponse.status == "success") {
        contractEmployeeList = contractEmployeeListResponse.data?.dataList as ContractEmployeeListDTO[];
    }

    return {
        currentRoleCode,
        contractEmployeeListParam,
        contractEmployeeListResponse,
        contractEmployeeList,
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