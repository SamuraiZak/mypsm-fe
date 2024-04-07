import { LocalStorageKeyConstant } from "$lib/constants/core/local-storage-key.constant";
import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
import type { CommonListRequestDTO } from "$lib/dto/core/common/common-list-request.dto";
import type { CommonResponseDTO } from "$lib/dto/core/common/common-response.dto";
import type { RenewContractAddDTO } from "$lib/dto/mypsm/kakitangan-kontrak/renew-contract-add.dto";
import type { RenewContractEmployeeTable } from "$lib/dto/mypsm/kakitangan-kontrak/renew-contract-employee-table.dto";
import type { RenewContractListResponseDTO } from "$lib/dto/mypsm/kakitangan-kontrak/renew-contract-list-response.dto";
import type { RenewContractListDTO } from "$lib/dto/mypsm/kakitangan-kontrak/renew-contract-list.dto";
import type { RenewContractSuppAppTable } from "$lib/dto/mypsm/kakitangan-kontrak/renew-contract-supp-app-table.dto";
import { getSuccessToast } from "$lib/helpers/core/toast.helper";
import { ContractEmployeeServices } from "$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service";

export const load = async () => {
    let currentRoleCode = localStorage.getItem(LocalStorageKeyConstant.currentRoleCode)
    let nearExpiredContractListResponse: CommonResponseDTO = {};
    let nearExpiredContractList: RenewContractListResponseDTO[] = [];
    let renewContractListResponse: CommonResponseDTO = {};
    let renewContractList: RenewContractListResponseDTO[] = [];
    let supporterApproverTable: RenewContractSuppAppTable[] = [];
    let supporterApproverTableResponse: CommonResponseDTO = {};
    let employeeTable: RenewContractEmployeeTable[] = [];
    let employeeTableResponse: CommonResponseDTO = {};

    //near expired contract table
    const nearExpiredContractFilter: RenewContractListDTO = {
        dataType: 0,
        identityCard: null,
        temporaryId: null,
    }
    const nearExpiredContractParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: null,
        orderType: null,
        filter: nearExpiredContractFilter,
    };

    //renew contract in process table
    const renewContractFilter: RenewContractListDTO = {
        dataType: 1,
        identityCard: null,
        temporaryId: null,
    }
    const renewContractParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "contractId",
        orderType: 1,
        filter: renewContractFilter,
    };

    const supporterApproverParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: "contractId",
        orderType: 1,
        filter: {},
    }

    if (currentRoleCode === UserRoleConstant.urusSetiaKhidmatSokongan.code || currentRoleCode === UserRoleConstant.pengarahBahagian.code || currentRoleCode === UserRoleConstant.pengarahNegeri.code) {
        //get list of renew contract process 
        renewContractListResponse =
            await ContractEmployeeServices.getRenewContractList(renewContractParam)
        renewContractList =
            renewContractListResponse.data?.dataList as RenewContractListResponseDTO[]
        if (currentRoleCode === UserRoleConstant.urusSetiaKhidmatSokongan.code) {
            //get list of near expired contract
            nearExpiredContractListResponse =
                await ContractEmployeeServices.getRenewContractList(nearExpiredContractParam)
            nearExpiredContractList =
                nearExpiredContractListResponse.data?.dataList as RenewContractListResponseDTO[]
        }
    } else if (currentRoleCode === UserRoleConstant.penyokong.code) {
        supporterApproverTableResponse =
            await ContractEmployeeServices.getRenewContractSupporterTable(supporterApproverParam);
        supporterApproverTable =
            supporterApproverTableResponse.data?.dataList as RenewContractSuppAppTable[];
    } else if (currentRoleCode === UserRoleConstant.pelulus.code) {
        supporterApproverTableResponse =
            await ContractEmployeeServices.getRenewContractApproverTable(supporterApproverParam);
        supporterApproverTable =
            supporterApproverTableResponse.data?.dataList as RenewContractSuppAppTable[];
    } else if (currentRoleCode === UserRoleConstant.kakitanganKontrak.code) {
        employeeTableResponse =
            await ContractEmployeeServices.getRenewContractEmployeeTable(supporterApproverParam)
        employeeTable =
            employeeTableResponse.data?.dataList as RenewContractEmployeeTable[];
    }

    return {
        currentRoleCode,
        nearExpiredContractParam,
        nearExpiredContractListResponse,
        nearExpiredContractList,
        renewContractParam,
        renewContractListResponse,
        renewContractList,
        supporterApproverTable,
        supporterApproverTableResponse,
        supporterApproverParam,
        employeeTableResponse,
        employeeTable,
    }
}

export const _addSelectedContractForRenew = async (selectedContract: RenewContractAddDTO) => {
    const response: CommonResponseDTO =
        await ContractEmployeeServices.addRenewContract(selectedContract);

    if (response.message == "success") {
        getSuccessToast();
        return response
    }
}

//update near expired contract table
export async function _updateTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await ContractEmployeeServices.getRenewContractList(param);
    return {
        props: {
            param,
            response,
        },
    };
}
//update supporter approver table
export async function _updateSupporterTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await ContractEmployeeServices.getRenewContractSupporterTable(param);
    return {
        props: {
            param,
            response,
        },
    };
}
//update approver approver table
export async function _updateApproverTable(param: CommonListRequestDTO) {
    const response: CommonResponseDTO = await ContractEmployeeServices.getRenewContractApproverTable(param);
    return {
        props: {
            param,
            response,
        },
    };
}