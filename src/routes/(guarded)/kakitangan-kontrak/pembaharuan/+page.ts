import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { RenewContractListResponseDTO } from "$lib/dto/mypsm/kakitangan-kontrak/renew-contract-list-response.dto";
import type { RenewContractListDTO } from "$lib/dto/mypsm/kakitangan-kontrak/renew-contract-list.dto";
import { ContractEmployeeServices } from "$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let nearExpiredContractListResponse: CommonResponseDTO = {};
    let nearExpiredContractList: RenewContractListResponseDTO[] = [];
    let renewContractListResponse: CommonResponseDTO = {};
    let renewContractList: RenewContractListResponseDTO[] = [];

    //near expired contract table
    const nearExpiredContractFilter: RenewContractListDTO = {
        dataType: 0,
    }
    const nearExpiredContractParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: nearExpiredContractFilter,
    };

    //renew contract in process table
    const renewContract: RenewContractListDTO = {
        dataType: 1,
    }
    const renewContractParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: renewContract,
    };

    //get list of near expired contract
    nearExpiredContractListResponse =
        await ContractEmployeeServices.getRenewContractList(nearExpiredContractParam)
    nearExpiredContractList =
        nearExpiredContractListResponse.data?.dataList as RenewContractListResponseDTO[]

    //get list of renew contract process 
    renewContractListResponse =
        await ContractEmployeeServices.getRenewContractList(renewContractParam)
    renewContractList =
        renewContractListResponse.data?.dataList as RenewContractListResponseDTO[]

    return {
        currentRoleCode,
        nearExpiredContractParam,
        nearExpiredContractListResponse,
        nearExpiredContractList,
        renewContractParam,
        renewContractListResponse,
        renewContractList,
    }
}