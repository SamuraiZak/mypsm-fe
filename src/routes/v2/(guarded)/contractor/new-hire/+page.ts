import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { ContractEmployeeListDTO } from '$lib/dto/mypsm/kakitangan-kontrak/contract-employee-list.dto';
import type { GetContractEmployeeOffer } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-employee-offer.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { ContractEmployeeServices } from '$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service';

export const load = async ({ parent }) => {
    const { layoutData } = await parent();

    const currentRoleCode: string = layoutData.accountDetails.currentRoleCode

    let contractEmployeeListResponse: CommonResponseDTO = {};
    let contractEmployeeList: ContractEmployeeListDTO[] = [];
    let contractEmployeeList2: ContractEmployeeListDTO[] = [];
    let contractEmployeeList3: ContractEmployeeListDTO[] = [];
    let employeeContractOffer: GetContractEmployeeOffer[] = [];
    const contractEmployeeListParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'applicationId',
        orderType: 1,
        filter: {
            identityDocumentNumber: null, //string | null | undefined;
            temporaryId: null,
            name: null,
            dataType: 1,
            status: null, // status code from lookup | null | undefined;
        },
    };
    // table
    if (currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code) {
        contractEmployeeListResponse =
            await ContractEmployeeServices.getContractEmployeeList(
                contractEmployeeListParam,
            );
        if (contractEmployeeListResponse.status == 'success') {
            contractEmployeeList = contractEmployeeListResponse.data
                ?.dataList as ContractEmployeeListDTO[];
        }
    } else if (currentRoleCode === UserRoleConstant.calonKontrak.code) {
        contractEmployeeListResponse =
            await ContractEmployeeServices.getContractEmployeeOfferList();
        if (contractEmployeeListResponse.status == 'success') {
            employeeContractOffer = contractEmployeeListResponse.data
                ?.dataList as GetContractEmployeeOffer[];
        }
    }
    contractEmployeeListResponse =
        await ContractEmployeeServices.getContractSupporterTable(
            contractEmployeeListParam,
        );
    if (contractEmployeeListResponse.status == 'success') {
        contractEmployeeList2 = contractEmployeeListResponse.data
            ?.dataList as ContractEmployeeListDTO[];
    }

    contractEmployeeListResponse =
        await ContractEmployeeServices.getContractApproverTable(
            contractEmployeeListParam,
        );
    if (contractEmployeeListResponse.status == 'success') {
        contractEmployeeList3 = contractEmployeeListResponse.data
            ?.dataList as ContractEmployeeListDTO[];
    }
    // ==========================================================================
    // Get Lookup Functions
    // ==========================================================================
    const statusLookupResponse: CommonResponseDTO =
        await LookupServices.getStatusEnums();

    const statusLookup: DropdownDTO[] =
        LookupServices.setSelectOptionsInString(statusLookupResponse);
    return {
        currentRoleCode,
        contractEmployeeListParam,
        contractEmployeeListResponse,
        contractEmployeeList,
        employeeContractOffer,
        contractEmployeeList2,
        contractEmployeeList3,
        selectionOptions: {
            statusLookup,
        },
    };
};
