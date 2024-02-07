

import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
import type { ListNewContractResponse } from '$lib/dto/mypsm/contract-employment/list-new-contract-response.dto';
import { ContractEmploymentServices } from '$lib/services/implementations/mypsm/contract-employment/contract-employment.service';
import { loadingState } from '$lib/stores/globalState';

export async function load() {

    const param: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 10,
        orderBy: '',
        orderType: '',
        filter: {
            dataType: "New",
            identityCard: null,
            staffNo: null,
            staffName: null,
            dateRequest: null,
            dateHire: null,
            status: null,
        },
    }

    const newContractResponse: CommonResponseDTO =
        await ContractEmploymentServices.getNewContractList(param);
        
    const newHireList: ListNewContractResponse[] = newContractResponse.data?.dataList as ListNewContractResponse[];

    return {
        prop: {
            param,
            newContractResponse,
            newHireList,
        },

    };
}


export async function _updateTable(param: CommonListRequestDTO) {
    loadingState.set(true);
    param.filter.dataType =
        param.filter.dataType == 'New'
            ? 'Submitted'
            : param.filter.allowance
    const response: CommonResponseDTO =
        await ContractEmploymentServices.getNewContractList(param);

    loadingState.set(false);

    return {
        props: {
            param,
            response,
        },
    };
}