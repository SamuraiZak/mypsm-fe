import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
import type { ContractEmployeeListDTO } from '$lib/dto/mypsm/kakitangan-kontrak/contract-employee-list.dto';
import type { GetContractEmployeeOffer } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-employee-offer.dto';
import { LookupServices } from '$lib/services/implementation/core/lookup/lookup.service';
import { ContractEmployeeServices } from '$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service';

export const load = async () => {
    const currentRoleCode: string | null = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );
    let contractEmployeeListResponse: CommonResponseDTO = {};
    let contractEmployeeList: ContractEmployeeListDTO[] = [];
    let employeeContractOffer: GetContractEmployeeOffer[] = [];
    const contractEmployeeListParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 5,
        orderBy: 'candidateId',
        orderType: 1,
        filter: {
            identityDocumentNumber: null, //string | null | undefined;
            temporaryId: null,
            name: null,
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
    } else if (currentRoleCode === UserRoleConstant.penyokong.code) {
        contractEmployeeListResponse =
            await ContractEmployeeServices.getContractSupporterTable(
                contractEmployeeListParam,
            );
        if (contractEmployeeListResponse.status == 'success') {
            contractEmployeeList = contractEmployeeListResponse.data
                ?.dataList as ContractEmployeeListDTO[];
        }
    } else if (currentRoleCode === UserRoleConstant.pelulus.code) {
        contractEmployeeListResponse =
            await ContractEmployeeServices.getContractApproverTable(
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
        selectionOptions: {
            statusLookup,
        },
    };
};
