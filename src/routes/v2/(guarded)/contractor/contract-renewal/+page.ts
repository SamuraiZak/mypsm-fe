import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { RenewContractAddDTO } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-add.dto';
import type { RenewContractEmployeeTable } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-employee-table.dto';
import type { RenewContractListResponseDTO } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-list-response.dto';
import type { RenewContractListDTO } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-list.dto';
import type { RenewContractSuppAppTable } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-supp-app-table.dto';
import { getSuccessToast } from '$lib/helpers/core/toast.helper';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { ContractEmployeeServices } from '$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service';

export const load = async ({ parent }) => {
    const { layoutData } = await parent();

    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode
    let nearExpiredContractListResponse: CommonResponseDTO = {};
    let nearExpiredContractList: RenewContractListResponseDTO[] = [];
    let renewContractListResponse: CommonResponseDTO = {};
    let renewContractList: RenewContractListResponseDTO[] = [];
    let supporterApproverTable: RenewContractSuppAppTable[] = [];
    let supporterApproverTableResponse: CommonResponseDTO = {};
    let employeeTable: RenewContractEmployeeTable[] = [];
    let employeeTableResponse: CommonResponseDTO = {};

    // const suppAppResponse: CommonListRequestDTO = {
    //     pageNum: 1,
    //     pageSize: 10000,
    //     orderBy: 'name',
    //     orderType: 0,
    //     filter: {
    //         program: 'TETAP',
    //         employeeNumber: null,
    //         name: null,
    //         identityCard: null,
    //         scheme: null,
    //         grade: null,
    //         position: null,
    //     },
    // };
    // const supporterApproverResponse: CommonResponseDTO =
    //     await LookupServices.getEmployeeList(suppAppResponse);

    // const supporterApproverLookup: DropdownDTO[] =
    //     LookupServices.setSelectOptionSupporterAndApprover(
    //         supporterApproverResponse,
    //     );

    //near expired contract table
    const nearExpiredContractFilter: RenewContractListDTO = {
        dataType: 0,
        identityDocumentNumber: null, //string | null | undefined;
        temporaryId: null,
        name: null,
        status: null, // status code from lookup | null | undefined;
    };
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
        identityDocumentNumber: null, //string | null | undefined;
        temporaryId: null,
        name: null,
        status: null, // status code from lookup | null | undefined;
    };
    const renewContractParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'contractId',
        orderType: 1,
        filter: renewContractFilter,
    };

    const supporterApproverParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'contractId',
        orderType: 1,
        filter: {
            identityDocumentNumber: null, //string | null | undefined;
            temporaryId: null,
            name: null,
            status: null, // status code from lookup | null | undefined;
        },
    };

    if (
        currentRoleCode === UserRoleConstant.urusSetiaKhidmatSokongan.code ||
        currentRoleCode === UserRoleConstant.pengarahBahagian.code ||
        currentRoleCode === UserRoleConstant.pengarahNegeri.code
    ) {
        //get list of renew contract process
        renewContractListResponse =
            await ContractEmployeeServices.getRenewContractList(
                renewContractParam,
            );
        renewContractList = renewContractListResponse.data
            ?.dataList as RenewContractListResponseDTO[];
        if (
            currentRoleCode === UserRoleConstant.urusSetiaKhidmatSokongan.code
        ) {
            //get list of near expired contract
            nearExpiredContractListResponse =
                await ContractEmployeeServices.getRenewContractList(
                    nearExpiredContractParam,
                );
            nearExpiredContractList = nearExpiredContractListResponse.data
                ?.dataList as RenewContractListResponseDTO[];
        }
    }  else if (currentRoleCode === UserRoleConstant.kakitanganKontrak.code) {
        employeeTableResponse =
            await ContractEmployeeServices.getRenewContractEmployeeTable(
                supporterApproverParam,
            );
        employeeTable = employeeTableResponse.data
            ?.dataList as RenewContractEmployeeTable[];
    }


    // supporterApproverTableResponse =
    //     await ContractEmployeeServices.getRenewContractSupporterTable(
    //         supporterApproverParam,
    //     );
    // supporterApproverTable = supporterApproverTableResponse.data
    //     ?.dataList as RenewContractSuppAppTable[];


    supporterApproverTableResponse =
        await ContractEmployeeServices.getRenewContractApproverTable(
            supporterApproverParam,
        );
    supporterApproverTable = supporterApproverTableResponse.data
        ?.dataList as RenewContractSuppAppTable[];


    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const statusLookupResponse: CommonResponseDTO =
        await LookupServices.getStatusEnums();

    const statusLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(statusLookupResponse);



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
        // supporterApproverLookup,
        selectionOptions: {
            statusLookup,
        },
    };
};

export const _addSelectedContractForRenew = async (
    selectedContract: RenewContractAddDTO
) => {
    let temp: RenewContractAddDTO = { contractors: [] }

    selectedContract.contractors.forEach((val) => {
        temp.contractors.push({ applicationId: val.contractId })
    })
    const response: CommonResponseDTO =
        await ContractEmployeeServices.addRenewContract(temp);

    if (response.status == 'success') {
        return { response };
    }
};
